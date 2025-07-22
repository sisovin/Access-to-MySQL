import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Database, FileCode, Code } from "lucide-react";

interface DatabaseObject {
  name: string;
  type: string;
  recordCount: number;
  selected: boolean;
}

interface DatabasePreviewProps {
  databaseName?: string;
  onSelectionChange?: (selectedItems: DatabaseObject[]) => void;
  onContinue?: () => void;
}

const DatabasePreview = ({
  databaseName = "Sample.accdb",
  onSelectionChange = () => {},
  onContinue = () => {},
}: DatabasePreviewProps) => {
  // Mock data for tables
  const [tables, setTables] = useState<DatabaseObject[]>([
    { name: "Customers", type: "table", recordCount: 91, selected: true },
    { name: "Orders", type: "table", recordCount: 830, selected: true },
    { name: "Products", type: "table", recordCount: 77, selected: true },
    { name: "Employees", type: "table", recordCount: 9, selected: true },
    { name: "Categories", type: "table", recordCount: 8, selected: true },
    { name: "Suppliers", type: "table", recordCount: 29, selected: true },
    { name: "Shippers", type: "table", recordCount: 3, selected: true },
  ]);

  // Mock data for queries
  const [queries, setQueries] = useState<DatabaseObject[]>([
    { name: "CustomerOrders", type: "query", recordCount: 830, selected: true },
    {
      name: "ProductsByCategory",
      type: "query",
      recordCount: 77,
      selected: true,
    },
    {
      name: "SalesByEmployee",
      type: "query",
      recordCount: 42,
      selected: false,
    },
    { name: "OrderDetails", type: "query", recordCount: 2155, selected: true },
    { name: "TopCustomers", type: "query", recordCount: 10, selected: false },
  ]);

  // Mock data for stored procedures
  const [procedures, setProcedures] = useState<DatabaseObject[]>([
    {
      name: "UpdateInventory",
      type: "procedure",
      recordCount: 0,
      selected: false,
    },
    {
      name: "CalculateOrderTotal",
      type: "procedure",
      recordCount: 0,
      selected: true,
    },
    {
      name: "GenerateInvoice",
      type: "procedure",
      recordCount: 0,
      selected: false,
    },
  ]);

  // Handle checkbox change for tables
  const handleTableSelection = (index: number) => {
    const updatedTables = [...tables];
    updatedTables[index].selected = !updatedTables[index].selected;
    setTables(updatedTables);
    notifySelectionChange();
  };

  // Handle checkbox change for queries
  const handleQuerySelection = (index: number) => {
    const updatedQueries = [...queries];
    updatedQueries[index].selected = !updatedQueries[index].selected;
    setQueries(updatedQueries);
    notifySelectionChange();
  };

  // Handle checkbox change for procedures
  const handleProcedureSelection = (index: number) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[index].selected = !updatedProcedures[index].selected;
    setProcedures(updatedProcedures);
    notifySelectionChange();
  };

  // Notify parent component of selection changes
  const notifySelectionChange = () => {
    const selectedItems = [
      ...tables.filter((table) => table.selected),
      ...queries.filter((query) => query.selected),
      ...procedures.filter((procedure) => procedure.selected),
    ];
    onSelectionChange(selectedItems);
  };

  // Calculate total selected items
  const totalSelected =
    tables.filter((t) => t.selected).length +
    queries.filter((q) => q.selected).length +
    procedures.filter((p) => p.selected).length;

  // Calculate total items
  const totalItems = tables.length + queries.length + procedures.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Database Preview</h2>
          <p className="text-gray-600">
            <Database className="inline mr-2 h-4 w-4" />
            {databaseName}
          </p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="mb-2">
            {totalSelected} of {totalItems} selected
          </Badge>
          <div className="text-sm text-gray-500">Select items to migrate</div>
        </div>
      </div>

      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="tables" className="flex items-center">
            <Database className="mr-2 h-4 w-4" /> Tables ({tables.length})
          </TabsTrigger>
          <TabsTrigger value="queries" className="flex items-center">
            <FileCode className="mr-2 h-4 w-4" /> Queries ({queries.length})
          </TabsTrigger>
          <TabsTrigger value="procedures" className="flex items-center">
            <Code className="mr-2 h-4 w-4" /> Stored Procedures (
            {procedures.length})
          </TabsTrigger>
        </TabsList>

        <Card>
          <TabsContent value="tables" className="mt-0">
            <CardHeader className="pb-2">
              <CardTitle>Tables</CardTitle>
              <CardDescription>
                Select the tables you want to migrate to MySQL.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Table Name</TableHead>
                      <TableHead className="text-right">Records</TableHead>
                      <TableHead className="w-20">Info</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tables.map((table, index) => (
                      <TableRow key={table.name}>
                        <TableCell>
                          <Checkbox
                            checked={table.selected}
                            onCheckedChange={() => handleTableSelection(index)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {table.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {table.recordCount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </TabsContent>

          <TabsContent value="queries" className="mt-0">
            <CardHeader className="pb-2">
              <CardTitle>Queries</CardTitle>
              <CardDescription>
                Select the queries you want to migrate as views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Query Name</TableHead>
                      <TableHead className="text-right">Results</TableHead>
                      <TableHead className="w-20">Info</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queries.map((query, index) => (
                      <TableRow key={query.name}>
                        <TableCell>
                          <Checkbox
                            checked={query.selected}
                            onCheckedChange={() => handleQuerySelection(index)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {query.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {query.recordCount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </TabsContent>

          <TabsContent value="procedures" className="mt-0">
            <CardHeader className="pb-2">
              <CardTitle>Stored Procedures</CardTitle>
              <CardDescription>
                Select the stored procedures you want to migrate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Procedure Name</TableHead>
                      <TableHead className="text-right">Type</TableHead>
                      <TableHead className="w-20">Info</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procedures.map((procedure, index) => (
                      <TableRow key={procedure.name}>
                        <TableCell>
                          <Checkbox
                            checked={procedure.selected}
                            onCheckedChange={() =>
                              handleProcedureSelection(index)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {procedure.name}
                        </TableCell>
                        <TableCell className="text-right">Procedure</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button
          onClick={onContinue}
          disabled={totalSelected === 0}
          className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500"
        >
          Continue with {totalSelected} item{totalSelected !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
};

export default DatabasePreview;
