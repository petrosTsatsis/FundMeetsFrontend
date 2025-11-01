"use client";

import {useState, useEffect, useRef} from "react";
import {useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {
    ChevronLeft,
    ChevronRight,
    Check,
    AlertTriangle,
    Briefcase,
    Factory,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {cn} from "@/lib/utils";
import {
    ApiClient,
    INDUSTRY_OPTIONS as INDUSTRY_ENUM_OPTIONS,
    STARTUP_STAGE_OPTIONS as STAGE_ENUM_OPTIONS,
    BUSINESS_MODEL_OPTIONS as BUSINESS_ENUM_OPTIONS,
    INVESTOR_TYPE_OPTIONS as INVESTOR_TYPE_ENUM_OPTIONS,
} from "@/lib/api";
import { useApi } from "@/lib/use-api";
import {motion, AnimatePresence} from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {Calendar as CalendarIcon} from "lucide-react";
import {Slider} from "@/components/ui/slider";

// Options
const INDUSTRY_OPTIONS = INDUSTRY_ENUM_OPTIONS as string[];
const STAGE_OPTIONS = STAGE_ENUM_OPTIONS as string[];
const BUSINESS_MODEL_OPTIONS = BUSINESS_ENUM_OPTIONS as string[];
const INVESTOR_TYPE_OPTIONS = INVESTOR_TYPE_ENUM_OPTIONS as string[];

function MultiSelect({
                         label,
                         options,
                         selected,
                         onChange,
                         placeholder,
                     }: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const toggle = (value: string) => {
        const exists = selected.includes(value);
        onChange(
            exists ? selected.filter((v) => v !== value) : [...selected, value]
        );
    };
    const display = selected.length
        ? selected.length <= 2
            ? selected.join(", ")
            : `${selected.slice(0, 2).join(", ")}, +${selected.length - 2}`
        : placeholder || "Select";
    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-between">
                        {display}
                        <ChevronRight className="h-4 w-4 rotate-90"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    {options.map((opt) => (
                        <DropdownMenuCheckboxItem
                            key={opt}
                            checked={selected.includes(opt)}
                            // prevent Radix from closing the menu on select
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={() => toggle(opt)}
                        >
                            {opt}
                        </DropdownMenuCheckboxItem>
                    ))}
                    <div className="p-2 border-t mt-1">
                        <Button type="button" variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                            Done
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

const steps = [
    {id: 1, title: "Role Selection", description: "Choose your role"},
    {id: 2, title: "Account Info", description: "Setup your account"},
    {id: 3, title: "Business Details", description: "Setup your business info"},
    {id: 4, title: "Review & Complete", description: "Finalize your setup"},
    {id: 5, title: "Completed", description: "You're all set!"},
];

export default function OnboardingFlow() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const api = useApi();
    const {getToken, userId} = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        website: "",
        location: "",
    });
    const [startupData, setStartupData] = useState({
        industry: [] as string[],
        stage: "",
        businessModel: [] as string[],
        teamSize: "",
        foundedDate: "",
    });
    const [investorData, setInvestorData] = useState({
        investorType: "",
        currentPosition: "",
        checkSizeRange: [0, 0] as number[],
        checkSizeUnlimited: false,
        preferredStage: [] as string[],
        preferredIndustry: [] as string[],
        preferredBusinessModels: [] as string[],
        geographyFocus: [] as string[],
        geographyInput: "",
    });
    // 'Other' custom inputs (UI-only)
    const [startupIndustryOther, setStartupIndustryOther] = useState("");
    const [startupBusinessOther, setStartupBusinessOther] = useState("");
    const [investorStageOther, setInvestorStageOther] = useState("");
    const [investorIndustryOther, setInvestorIndustryOther] = useState("");
    const [investorBusinessOther, setInvestorBusinessOther] = useState("");
    const [selectedRole, setSelectedRole] = useState<"STARTUP" | "INVESTOR" | "">(
        ""
    );
    const [direction, setDirection] = useState<1 | -1>(1);

    const updateShared = (field: string, value: string) =>
        setFormData((prev) => ({...prev, [field]: value}));
    const updateStartup = (field: string, value: string | string[]) =>
        setStartupData((prev) => ({...prev, [field]: value as any}));
    const updateInvestor = (field: string, value: any) =>
        setInvestorData((prev) => ({...prev, [field]: value}));

    // Smooth step variants
    const stepVariants = {
        enter: (dir: 1 | -1) => ({
            opacity: 0,
            x: dir > 0 ? 28 : -28,
            scale: 0.98,
        }),
        center: {opacity: 1, x: 0, scale: 1},
        exit: (dir: 1 | -1) => ({opacity: 0, x: dir > 0 ? -28 : 28, scale: 0.98}),
    };
    const stepTransition = {duration: 0.35, ease: "easeOut" as const};

    useEffect(() => {
        const run = async () => {
            try {
                if (!userId) return;
                const key = `fm_synced_bare_user_${userId}`;
                if (typeof window !== "undefined" && sessionStorage.getItem(key)) {
                    return;
                }
                if (typeof window !== "undefined") {
                    sessionStorage.setItem(key, "1");
                }

                const token = await getToken({ template: "FundMeets" });
                if (!token) {
                    console.warn("No Clerk token found, skipping sync.");
                    if (typeof window !== "undefined") {
                        sessionStorage.removeItem(key);
                    }
                    return;
                }

                const api = new ApiClient();
                api.setToken(token);
                await api.syncBareUser();
            } catch (err) {
                console.error("Failed to sync user:", err);
                if (typeof window !== "undefined" && userId) {
                    const key = `fm_synced_bare_user_${userId}`;
                    sessionStorage.removeItem(key);
                }
            }
        };

        run();
    }, [getToken, userId]);

    const handleNext = async () => {
        if (currentStep < 4) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
            return;
        }

        if (currentStep === 4) {
            setIsLoading(true);
            try {
                // await api?.syncBareUser();

                if (selectedRole === "STARTUP") {
                    const payload: any = {
                        role: "STARTUP",
                        name: formData.name,
                        website: formData.website || undefined,
                        location: formData.location || undefined,
                        industry: Array.isArray(startupData.industry)
                            ? (startupData.industry[0] || undefined)
                            : (startupData.industry as any) || undefined,
                        stage: startupData.stage || undefined,
                        businessModel: Array.isArray(startupData.businessModel)
                            ? (startupData.businessModel[0] || undefined)
                            : (startupData.businessModel as any) || undefined,
                        teamSize: startupData.teamSize
                            ? Number(startupData.teamSize)
                            : 1,
                        foundedDate: startupData.foundedDate
                            ? new Date(startupData.foundedDate + "T00:00:00Z").toISOString()
                            : undefined,
                    };
                    await api?.completeOnboarding(payload);
                } else if (selectedRole === "INVESTOR") {
                    const payload: any = {
                        role: "INVESTOR",
                        name: formData.name,
                        website: formData.website || undefined,
                        location: formData.location || undefined,
                        investorType: investorData.investorType || undefined,
                        currentPosition: investorData.currentPosition || undefined,
                        checkSizeMin: Array.isArray(investorData.checkSizeRange)
                            ? (investorData.checkSizeRange[0] || 0)
                            : 0,
                        checkSizeMax: Array.isArray(investorData.checkSizeRange)
                            ? (investorData.checkSizeRange[1] || 0)
                            : 0,
                        preferredStage: investorData.preferredStage || undefined,
                        preferredIndustry: investorData.preferredIndustry || undefined,
                        preferredBusinessModels: investorData.preferredBusinessModels || undefined,
                        geographyFocus: investorData.geographyFocus || undefined,
                    };
                    await api?.completeOnboarding(payload);
                } else {
                    throw new Error("Please select a role to continue");
                }

                toast.success("Onboarding completed successfully!");
                setDirection(1);
                setCurrentStep(5);
            } catch (err) {
                console.error(err);
                toast.error("Failed to complete onboarding.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    };

    // Redirect to dashboard when onboarding is complete
    useEffect(() => {
        if (currentStep === 5) {
            const timer = setTimeout(() => router.push("/dashboard"), 2000);
            return () => clearTimeout(timer);
        }
    }, [currentStep, router]);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle>Choose Your Role</CardTitle>
                            <CardDescription>
                                Select how you want to use FundMeets platform
                            </CardDescription>
                        </CardHeader>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card
                                className={cn(
                                    "cursor-pointer transition-all",
                                    selectedRole === "STARTUP"
                                        ? "bg-[var(--primary-800)]/5 border-[var(--primary-700)] ring ring-[var(--primary-700)]"
                                        : "border-gray-200 hover:shadow-md"
                                )}
                                onClick={() => setSelectedRole("STARTUP")}
                            >
                                <CardContent className="flex items-start space-x-4 p-6">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Factory className="h-6 w-6 text-[var(--primary)]"/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3
                                            className={cn(
                                                "mb-1 font-semibold",
                                                selectedRole === "STARTUP"
                                                    ? "text-[var(--primary)]"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            Startup
                                        </h3>
                                        <p
                                            className={cn(
                                                "text-sm",
                                                selectedRole === "STARTUP"
                                                    ? "text-[var(--primary)]"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            Looking for funding and investors to grow your business
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                className={cn(
                                    "cursor-pointer transition-all",
                                    selectedRole === "INVESTOR"
                                        ? "bg-[var(--primary-800)]/5 border-[var(--primary-700)] ring ring-[var(--primary-700)]"
                                        : "border-gray-200 hover:shadow-md"
                                )}
                                onClick={() => setSelectedRole("INVESTOR")}
                            >
                                <CardContent className="flex items-start space-x-4 p-6">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Briefcase className="h-6 w-6 text-[var(--primary)]"/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3
                                            className={cn(
                                                "mb-1 font-semibold",
                                                selectedRole === "INVESTOR"
                                                    ? "text-[var(--primary)]"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            Investor
                                        </h3>
                                        <p
                                            className={cn(
                                                "text-sm",
                                                selectedRole === "INVESTOR"
                                                    ? "text-[var(--primary)]"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            Looking to invest in promising startups and opportunities
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-5">
                        <CardHeader className="px-0 pt-0 pb-2">
                            <CardTitle className="text-base">Personal Info</CardTitle>
                            <CardDescription>
                                {selectedRole === "STARTUP" ? "Tell us about your startup" : "Tell us about yourself"}
                            </CardDescription>
                        </CardHeader>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="col-span-1 md:col-span-2">
                                <Label>
                                    Name <span className="text-red-500">*</span>
                                </Label>
                                <Input className="mt-2" value={formData.name}
                                       onChange={(e) => updateShared("name", e.target.value)}
                                       placeholder={selectedRole === "STARTUP" ? "Startup / Team name" : "Investor name"}/>
                            </div>

                            {selectedRole === "INVESTOR" && (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <Label>Investor Type</Label>
                                        <Select value={investorData.investorType}
                                                onValueChange={(v) => updateInvestor("investorType", v)}>
                                            <SelectTrigger className="mt-0">
                                                <SelectValue placeholder="Select investor type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {INVESTOR_TYPE_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Current Position</Label>
                                        <Input className="mt-2" placeholder="Managing Partner at X"
                                               value={investorData.currentPosition}
                                               onChange={(e) => updateInvestor("currentPosition", e.target.value)}/>
                                    </div>
                                </>
                            )}

                            <div>
                                <Label>Location (City, Country)</Label>
                                <Input className="mt-2" placeholder="e.g. London, United Kingdom"
                                       value={formData.location}
                                       onChange={(e) => updateShared("location", e.target.value)}/>
                            </div>

                            <div>
                                <Label>Website (optional)</Label>
                                <Input className="mt-2" placeholder="https://" value={formData.website}
                                       onChange={(e) => updateShared("website", e.target.value)}/>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-5">
                        <CardHeader className="px-0 pt-0 pb-2">
                            <CardTitle
                                className="text-base">{selectedRole === "STARTUP" ? "Business Details" : "Investment Preferences"}</CardTitle>
                            <CardDescription>
                                {selectedRole === "STARTUP" ? "Share some key details" : "Help us personalize your matches"}
                            </CardDescription>
                        </CardHeader>

                        {selectedRole === "STARTUP" ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <MultiSelect
                                        label="Industry"
                                        options={INDUSTRY_OPTIONS}
                                        selected={startupData.industry}
                                        onChange={(vals) => updateStartup("industry", vals)}
                                        placeholder="Select industries"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <Label>Stage</Label>
                                        <Select value={startupData.stage}
                                                onValueChange={(v) => updateStartup("stage", v)}>
                                            <SelectTrigger className="mt-0">
                                                <SelectValue placeholder="Select a stage"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {STAGE_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <MultiSelect
                                        label="Business Model"
                                        options={BUSINESS_MODEL_OPTIONS}
                                        selected={startupData.businessModel}
                                        onChange={(vals) => updateStartup("businessModel", vals)}
                                        placeholder="Select business models"
                                    />
                                    <div>
                                        <Label>Team Size</Label>
                                        <div className="mt-2 grid grid-cols-4 gap-3">
                                            {["1-1", "2-10", "10-50", "50+"].map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => updateStartup("teamSize", size)}
                                                    className={cn(
                                                        "rounded-lg border-2 p-3 text-center transition-all",
                                                        startupData.teamSize === size
                                                            ? "bg-[var(--primary-800)]/5 border-[var(--success-700)] ring-[var(--success-700)] text-[var(--success-800)]"
                                                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label>Founded Date (optional)</Label>
                                        <div className="mt-2 relative flex gap-2">
                                            <Input
                                                value={startupData.foundedDate ? new Date(startupData.foundedDate).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric"
                                                }) : ""}
                                                placeholder="Select date"
                                                readOnly
                                                className="bg-background pr-10"
                                            />
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button id="date-picker" variant="ghost"
                                                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                                                        <CalendarIcon className="size-3.5"/>
                                                        <span className="sr-only">Select date</span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="end"
                                                                alignOffset={-8} sideOffset={10}>
                                                    <Calendar
                                                        mode="single"
                                                        selected={startupData.foundedDate ? new Date(startupData.foundedDate) : undefined}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            if (!date || isNaN(date.getTime())) {
                                                                updateStartup("foundedDate", "");
                                                                return;
                                                            }
                                                            const yyyy = date.getFullYear();
                                                            const mm = String(date.getMonth() + 1).padStart(2, "0");
                                                            const dd = String(date.getDate()).padStart(2, "0");
                                                            updateStartup("foundedDate", `${yyyy}-${mm}-${dd}`);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div/>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Label>Check Size Range (optional)</Label>
                                        </div>
                                        <div className="text-xs text-muted-foreground">{`€${(investorData.checkSizeRange[0] || 0).toLocaleString()} - €${(investorData.checkSizeRange[1] || 0).toLocaleString()}`}</div>
                                    </div>
                                    <div className="px-1">
                                        <Slider
                                            min={0}
                                            max={Math.max(1000000, investorData.checkSizeRange[1] || 0)}
                                            defaultValue={[0, 0]}
                                            value={investorData.checkSizeRange as any}
                                            onValueChange={(vals) => {
                                                updateInvestor("checkSizeRange", vals);
                                            }}
                                            disabled={false}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1">
                                            <Label>Min</Label>
                                            <Input
                                                type="number"
                                                min={0}
                                                value={investorData.checkSizeRange[0] ?? 0}
                                                onChange={(e) => {
                                                    const num = Number(e.target.value || 0);
                                                    const v = isNaN(num) ? 0 : Math.max(0, num);
                                                    const currentMax = investorData.checkSizeRange[1] ?? v;
                                                    const newMax = Math.max(v, currentMax);
                                                    updateInvestor("checkSizeRange", [v, newMax]);
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Label>Max</Label>
                                            <Input
                                                type="number"
                                                value={investorData.checkSizeRange[1] ?? 0}
                                                onChange={(e) => {
                                                    const num = Number(e.target.value || 0);
                                                    const v = isNaN(num) ? 0 : Math.max(investorData.checkSizeRange[0] || 0, num);
                                                    updateInvestor("checkSizeRange", [investorData.checkSizeRange[0] || 0, v]);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <MultiSelect
                                        label="Preferred Stages"
                                        options={STAGE_OPTIONS}
                                        selected={investorData.preferredStage}
                                        onChange={(vals) => updateInvestor("preferredStage", vals)}
                                        placeholder="Select stages"
                                    />
                                    <MultiSelect
                                        label="Preferred Industries"
                                        options={INDUSTRY_OPTIONS}
                                        selected={investorData.preferredIndustry}
                                        onChange={(vals) => updateInvestor("preferredIndustry", vals)}
                                        placeholder="Select industries"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <MultiSelect
                                        label="Preferred Business Models"
                                        options={BUSINESS_MODEL_OPTIONS}
                                        selected={investorData.preferredBusinessModels}
                                        onChange={(vals) => updateInvestor("preferredBusinessModels", vals)}
                                        placeholder="Select business models"
                                    />
                                    <div className="space-y-2">
                                        <Label>Geography Focus (optional)</Label>
                                        <div className="flex gap-2">
                                            <Input className="flex-1" placeholder="Add location and press Add"
                                                   value={investorData.geographyInput}
                                                   onChange={(e) => updateInvestor("geographyInput", e.target.value)}/>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const val = (investorData.geographyInput || "").trim();
                                                    if (!val) return;
                                                    updateInvestor("geographyFocus", [...investorData.geographyFocus, val]);
                                                    updateInvestor("geographyInput", "");
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                        {investorData.geographyFocus.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {investorData.geographyFocus.map((g, idx) => (
                                                    <div key={g + idx}
                                                         className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                                                        <span>{g}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateInvestor("geographyFocus", investorData.geographyFocus.filter((x) => x !== g))}
                                                            className="text-gray-500 hover:text-gray-700"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-5">
                        <CardHeader className="px-0 pt-0 pb-2">
                            <CardTitle className="text-base">Review</CardTitle>
                            <CardDescription>Confirm your details before completing onboarding</CardDescription>
                        </CardHeader>

                        {/* Common Summary */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-lg border bg-muted/30 p-4">
                                <div className="text-xs font-medium text-muted-foreground mb-2">Profile</div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-muted-foreground">Role</div>
                                    <div className="font-medium">{selectedRole || "-"}</div>

                                    <div className="text-muted-foreground">Name</div>
                                    <div className="font-medium">{formData.name || "-"}</div>

                                    <div className="text-muted-foreground">Location</div>
                                    <div className="font-medium">{formData.location || "-"}</div>

                                    <div className="text-muted-foreground">Website</div>
                                    <div className="font-medium break-words">
                                        {formData.website ? (
                                            <a
                                                href={formData.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={formData.website}
                                                className="inline-block max-w-full truncate align-bottom underline hover:text-[var(--primary-700)]"
                                            >
                                                {formData.website}
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </div>
                                </div>
                            </div>

                            {selectedRole === "STARTUP" ? (
                                <div className="rounded-lg border bg-muted/30 p-4">
                                    <div className="text-xs font-medium text-muted-foreground mb-2">Startup Details
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-muted-foreground">Stage</div>
                                        <div className="font-medium">{startupData.stage || "-"}</div>

                                        <div className="text-muted-foreground">Team Size</div>
                                        <div className="font-medium">{startupData.teamSize || "-"}</div>

                                        <div className="text-muted-foreground">Founded</div>
                                        <div className="font-medium">{startupData.foundedDate || "-"}</div>
                                    </div>
                                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                                        <div>
                                            <div className="text-muted-foreground mb-1">Industry</div>
                                            {startupData.industry.length ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {startupData.industry.map((i, idx) => {
                                                    const key = `${i}-${idx}`;
                                                    return (
                                                        <span key={key}
                                                              className="rounded-md border px-2 py-0.5 text-xs bg-background">{i}</span>
                                                    );
                                                })}
                                                </div>
                                            ) : (
                                                <div className="font-medium">-</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-muted-foreground mb-1">Business Model</div>
                                            {startupData.businessModel.length ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {startupData.businessModel.map((m, idx) => {
                                                    const key = `${m}-${idx}`;
                                                    return (
                                                        <span key={key}
                                                              className="rounded-md border px-2 py-0.5 text-xs bg-background">{m}</span>
                                                    );
                                                })}
                                                </div>
                                            ) : (
                                                <div className="font-medium">-</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg border bg-muted/30 p-4">
                                    <div className="text-xs font-medium text-muted-foreground mb-2">Investment Details
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-muted-foreground">Investor Type</div>
                                        <div className="font-medium">{investorData.investorType || "-"}</div>

                                        <div className="text-muted-foreground">Current Position</div>
                                        <div className="font-medium">{investorData.currentPosition || "-"}</div>

                                        <div className="text-muted-foreground">Check Size Range</div>
                                        <div
                                            className="font-medium">{`€${(investorData.checkSizeRange[0] || 0).toLocaleString()} - €${(investorData.checkSizeRange[1] || 0).toLocaleString()}`}</div>
                                    </div>
                                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                                        <div>
                                            <div className="text-muted-foreground mb-1">Preferred Stages</div>
                                            {investorData.preferredStage.length ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {investorData.preferredStage.map((s, idx) => {
                                                    const key = `${s}-${idx}`;
                                                    return (
                                                        <span key={key}
                                                              className="rounded-md border px-2 py-0.5 text-xs bg-background">{s}</span>
                                                    );
                                                })}
                                                </div>
                                            ) : (
                                                <div className="font-medium">-</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-muted-foreground mb-1">Preferred Industries</div>
                                            {investorData.preferredIndustry.length ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {investorData.preferredIndustry.map((i, idx) => {
                                                    const key = `${i}-${idx}`;
                                                    return (
                                                        <span key={key}
                                                              className="rounded-md border px-2 py-0.5 text-xs bg-background">{i}</span>
                                                    );
                                                })}
                                                </div>
                                            ) : (
                                                <div className="font-medium">-</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-muted-foreground mb-1">Preferred Business Models</div>
                                            {investorData.preferredBusinessModels.length ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {investorData.preferredBusinessModels.map((m, idx) => {
                                                    const label = m === "Other" && investorBusinessOther ? `Other: ${investorBusinessOther}` : m;
                                                    const key = `${label}-${idx}`;
                                                    return (
                                                        <span key={key}
                                                              className="rounded-md border px-2 py-0.5 text-xs bg-background">{label}</span>
                                                    );
                                                })}
                                                </div>
                                            ) : (
                                                <div className="font-medium">-</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-muted-foreground mb-1">Geography Focus</div>
                                            {investorData.geographyFocus.length ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {investorData.geographyFocus.map((g, idx) => (
                                                        <span key={g + idx}
                                                              className="rounded-md border px-2 py-0.5 text-xs bg-background">{g}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="font-medium">-</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="rounded-lg border bg-yellow-50 p-4 md:col-span-2">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5"/>
                                    <div className="text-sm text-yellow-800">
                                        <div className="font-semibold">Final check</div>
                                        Please verify all fields. You can go back to make changes before completing
                                        onboarding.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle>Welcome to FundMeets!</CardTitle>
                            <CardDescription>
                                Your account has been set up successfully. Redirecting to
                                dashboard...
                            </CardDescription>
                        </CardHeader>
                        <Alert className="border-green-200 bg-green-50">
                            <Check className="h-4 w-4 text-green-600"/>
                            <AlertDescription className="text-green-800">
                                <strong>Setup Complete!</strong>
                            </AlertDescription>
                        </Alert>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.div
            className="w-full max-w-3xl"
            initial={{opacity: 0, y: 12, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            transition={{duration: 0.35, ease: "easeOut"}}
        >
            <Card className="w-full shadow-lg">
                <CardHeader className="pb-0">
                    {/* Onboarding Header */}
                    <div className="mb-3 flex items-center justify-between">
                        <div
                            className="inline-flex items-center rounded-full bg-[var(--primary-700)]/10 px-3 py-1 text-xs font-medium text-[var(--primary-800)]">
                            <span className="mr-2 h-2 w-2 rounded-full bg-[var(--primary-700)]"></span>
                            Onboarding
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {currentStep <= 4 ? `Step ${currentStep} of 4` : "Completed"}
                        </div>
                    </div>

                    {/* Welcome note */}
                    {currentStep <= 4 && (
                        <motion.div
                            initial={{opacity: 0, y: 4}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.25, ease: "easeOut"}}
                            className="mb-2"
                        >
                            <div className="text-sm font-semibold text-gray-900">Welcome to your onboarding</div>
                            <div className="text-xs text-muted-foreground">We’ll guide you through a few quick steps to
                                set up your account.
                            </div>
                        </motion.div>
                    )}
                    {/* Step Indicator */}
                    <div className="mb-4 flex items-center justify-between">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className="relative flex flex-1 flex-col items-center"
                            >
                                <div
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                                        currentStep > step.id
                                            ? "bg-[var(--primary-700)] text-white] "
                                            : currentStep === step.id
                                                ? "bg-[var(--primary-700)] text-white"
                                                : "bg-gray-200 text-gray-600"
                                    )}
                                >
                                    {currentStep > step.id ? (
                                        <Check className="h-5 w-5 text-white"/>
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "mt-2 text-center text-sm font-medium",
                                        currentStep >= step.id ? "text-gray-800" : "text-gray-500"
                                    )}
                                >
                                    {step.title}
                                </div>
                                {step.id < steps.length && (
                                    <div
                                        className={cn(
                                            "absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] -translate-y-1/2 bg-gray-200 transition-colors duration-300",
                                            currentStep > step.id &&
                                            "bg-[var(--success-200)] text-[var(--primary-600)] border-[var(--primary-100)]"
                                        )}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </CardHeader>

                <CardContent className="p-6 md:p-8">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentStep}
                            variants={stepVariants}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={stepTransition}
                        >
                            {renderStepContent()}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between border-t pt-6">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                        >
                            <ChevronLeft className="h-4 w-4"/>
                            <span>Previous</span>
                        </Button>

                        {currentStep < 5 ? (
                            <Button
                                onClick={handleNext}
                                disabled={(currentStep === 1 && !selectedRole) || isLoading}
                            >
                                {isLoading ? (
                                    <div
                                        className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                ) : (
                                    <>
                    <span>
                      {currentStep === 4 ? "Complete Onboarding" : "Continue"}
                    </span>
                                        <ChevronRight className="h-4 w-4"/>
                                    </>
                                )}
                            </Button>
                        ) : null}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
