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
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvestorsTableContent } from "@/components/ui/complete-components/dashboard-overview/tables/investors-table-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopInvestorData } from "@/lib/api";
import {
    formatCurrency,
    formatIndustry,
    formatInvestorType,
    formatStage,
} from "@/lib/enum-formatters";

const columns: ColumnDef<TopInvestorData>[] = [
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
        header: "Name",
        cell: ({ row }) => {
            const investor = row.original;
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={investor.profilePicture} alt={investor.name} />
                        <AvatarFallback className="text-sm font-semibold">
                            {investor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium text-[var(--primary-800)]">
                            {investor.name}
                        </div>
                        {investor.currentPosition && (
                            <div className="text-sm text-muted-foreground">
                                {investor.currentPosition}
                            </div>
                        )}
                    </div>
                </div>
            );
        },
        enableHiding: false,
    },
    {
        accessorKey: "investorType",
        header: () => <div className="text-center">Type</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Badge
                    variant="outline"
                    className="text-xs bg-[var(--orange-50)] text-[var(--orange-600)] border-[var(--orange-50)] px-2 py-0.5"
                >
                    {formatInvestorType(row.original.investorType)}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "dealsClosed",
        header: () => <div className="text-center">Closed Deals</div>,
        cell: ({ row }) => (
            <div className="text-center font-semibold text-[var(--primary-700)]">
                {row.original.dealsClosed ?? 0}
            </div>
        ),
    },
    {
        accessorKey: "matchesCount",
        header: () => <div className="text-center">Matches</div>,
        cell: ({ row }) => (
            <div className="text-center font-semibold text-[var(--primary-700)]">
                {row.original.matchesCount ?? 0}
            </div>
        ),
    },
    {
        accessorKey: "averageCheck",
        header: () => <div className="text-center">Average Check</div>,
        cell: ({ row }) => {
            const investor = row.original;
            const averageCheckSize =
                investor.checkSizeMin && investor.checkSizeMax
                    ? (investor.checkSizeMin + investor.checkSizeMax) / 2
                    : null;

            return (
                <div className="text-center font-semibold text-[var(--primary-700)]">
                    {averageCheckSize ? `${formatCurrency(averageCheckSize, "€")}` : "-"}
                </div>
            );
        },
    },
    {
        accessorKey: "preferredIndustry",
        header: () => <div className="text-center">Industry Preference</div>,
        cell: ({ row }) => (
            <div className="text-center text-sm text-muted-foreground">
                {formatIndustry(row.original.preferredIndustry?.[0])}
            </div>
        ),
    },
    {
        accessorKey: "preferredStage",
        header: () => <div className="text-center">Stage Preference</div>,
        cell: ({ row }) => (
            <div className="text-center text-sm text-muted-foreground">
                {formatStage(row.original.preferredStage?.[0])}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ }) => (
            <div className="flex justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Connect</DropdownMenuItem>
                        <DropdownMenuItem>Save Profile</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];

export function TopInvestorsTable({
    data: initialData,
}: {
    data: TopInvestorData[];
}) {
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
    const [view, setView] = React.useState("all-investors");

    const applySortForView = React.useCallback((nextView: string) => {
        switch (nextView) {
            case "by-closed-deals":
                setSorting([{ id: "dealsClosed", desc: true }]);
                break;
            case "by-type":
                setSorting([{ id: "investorType", desc: false }]); // alphabetical
                break;
            case "by-matches":
                setSorting([{ id: "matchesCount", desc: true }]);
                break;
            case "by-check":
                setSorting([{ id: "averageCheck", desc: true }]);
                break;
            case "by-industry":
                setSorting([{ id: "preferredIndustry", desc: false }]); // alphabetical
                break;
            case "by-stage":
                setSorting([{ id: "preferredStage", desc: false }]);
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
                        <SelectItem value="all-investors">All Investors</SelectItem>
                        <SelectItem value="by-closed-deals">By Closed Deals</SelectItem>
                        <SelectItem value="by-type">By Investor Type</SelectItem>
                        <SelectItem value="by-matches">By Matches</SelectItem>
                        <SelectItem value="by-check">By Check Size</SelectItem>
                        <SelectItem value="by-industry">By Industry</SelectItem>
                        <SelectItem value="by-stage">By Stage</SelectItem>
                    </SelectContent>
                </Select>

                <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden ...">
                    <TabsTrigger value="all-investors">All Investors</TabsTrigger>
                    <TabsTrigger value="by-closed-deals">By Closed Deals</TabsTrigger>
                    <TabsTrigger value="by-type">By Type</TabsTrigger>
                    <TabsTrigger value="by-matches">By Matches</TabsTrigger>
                    <TabsTrigger value="by-check">By Check Size</TabsTrigger>
                    <TabsTrigger value="by-industry">By Industry</TabsTrigger>
                    <TabsTrigger value="by-stage">By Stage</TabsTrigger>
                </TabsList>
            </div>

            {/* Replace all repeated blocks with this: */}
            <InvestorsTableContent
                value="all-investors"
                table={table}
                columns={columns}
            />
            <InvestorsTableContent
                value="by-closed-deals"
                table={table}
                columns={columns}
            />
            <InvestorsTableContent value="by-type" table={table} columns={columns} />
            <InvestorsTableContent
                value="by-matches"
                table={table}
                columns={columns}
            />
            <InvestorsTableContent value="by-check" table={table} columns={columns} />
            <InvestorsTableContent
                value="by-industry"
                table={table}
                columns={columns}
            />
            <InvestorsTableContent value="by-stage" table={table} columns={columns} />
        </Tabs>
    );
}
