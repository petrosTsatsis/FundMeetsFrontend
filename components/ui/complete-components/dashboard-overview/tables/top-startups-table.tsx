"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { CheckCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StartupsTableContent } from "@/components/ui/complete-components/dashboard-overview/tables/startups-table-content";

// Define the startup data type
export interface StartupData {
    id: string;
    name: string;
    description: string;
    industry: string;
    stage: string;
    amountNeeded: number;
    valuation: number;
    equityOffered: number;
    location: string;
    logo: string;
    verified: boolean;
    teamSize: number;
    foundedDate: Date;
    tags: string[];
    revenue?: number;
}

const columns: ColumnDef<StartupData>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Startup",
        cell: ({ row }) => {
            const startup = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={startup.logo} alt={startup.name} />
                            <AvatarFallback className="text-sm font-semibold">
                                {startup.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        {startup.verified && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="absolute -top-1 -right-1 bg-green-600 rounded-full p-0.5">
                                            <CheckCircle className="h-2.5 w-2.5 text-white" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Verified Startup</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-[var(--primary-800)]">
                            {startup.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {startup.location}
                        </div>
                    </div>
                </div>
            );
        },
        enableHiding: false,
    },
    {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className="bg-purple-500/10 text-purple-500 border-purple-500/10"
            >
                {row.original.stage}
            </Badge>
        ),
    },
    {
        accessorKey: "equityOffered",
        header: "Equity",
        cell: ({ row }) => (
            <span className="font-semibold text-[var(--primary-700)]">
                {row.original.equityOffered}%
            </span>
        ),
    },
    {
        accessorKey: "industry",
        header: "Industry",
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className="bg-[var(--orange-50)] text-[var(--orange-600)] border-[var(--orange-50)]"
            >
                {row.original.industry}
            </Badge>
        ),
    },
    {
        accessorKey: "amountNeeded",
        header: "Funding",
        cell: ({ row }) => (
            <span className="font-semibold text-[var(--primary-700)]">
                {(row.original.amountNeeded / 1000000).toFixed(1)}M €
            </span>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.location}
            </span>
        ),
    },
    {
        accessorKey: "valuation",
        header: "Valuation",
        cell: ({ row }) => (
            <span className="font-semibold text-[var(--primary-700)]">
                {(row.original.valuation / 1000000).toFixed(1)}M €
            </span>
        ),
    },
    {
        accessorKey: "revenue",
        header: "Revenue",
        cell: ({ row }) => (
            <span className="font-semibold text-[var(--primary-700)]">
                {row.original.revenue
                    ? `${(row.original.revenue / 1000000).toFixed(1)}M €`
                    : "N/A"}
            </span>
        ),
    },
    {
        id: "actions",
        cell: ({ }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Connect</DropdownMenuItem>
                    <DropdownMenuItem>Save Profile</DropdownMenuItem>
                    {/*<DropdownMenuSeparator />*/}
                    {/*<DropdownMenuItem>Report</DropdownMenuItem>*/}
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export function StartupsTable({ data: initialData }: { data: StartupData[] }) {
    const [data] = React.useState(() => initialData);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [view, setView] = React.useState("all-startups");

    const applySortForView = React.useCallback((nextView: string) => {
        switch (nextView) {
            case "by-equity":
                setSorting([{ id: "equityOffered", desc: true }]);
                break;
            case "by-valuation":
                setSorting([{ id: "valuation", desc: true }]);
                break;
            case "by-location":
                setSorting([{ id: "location", desc: false }]);
                break;
            default:
                setSorting([]);
        }
    }, []);

    React.useEffect(() => {
        applySortForView(view);
    }, [view, applySortForView]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <Tabs
            value={view}
            onValueChange={(v) => setView(v)}
            className="w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select value={view} onValueChange={(v) => setView(v)}>
                    <SelectTrigger
                        className="flex w-fit @4xl/main:hidden"
                        size="sm"
                        id="view-selector"
                    >
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-startups">All Startups</SelectItem>
                        <SelectItem value="by-equity">By Equity</SelectItem>
                        <SelectItem value="by-valuation">By Valuation</SelectItem>
                        <SelectItem value="by-location">By Location</SelectItem>
                    </SelectContent>
                </Select>
                <TabsList
                    className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="all-startups">All Startups</TabsTrigger>
                    <TabsTrigger value="by-equity">
                        By Equity <Badge variant="secondary">High</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="by-valuation">
                        By Valuation <Badge variant="secondary">Top</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="by-location">By Location</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <StartupsTableContent
                value="all-startups"
                table={table}
                columns={columns}
            />
            <StartupsTableContent
                value="by-equity"
                table={table}
                columns={columns}
            />
            <StartupsTableContent
                value="by-valuation"
                table={table}
                columns={columns}
            />
            <StartupsTableContent
                value="by-location"
                table={table}
                columns={columns}
            />
        </Tabs>
    );
}
