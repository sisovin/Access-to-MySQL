import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WizardStepper from "./WizardStepper";
import WizardContent from "./WizardContent";
import { motion } from "framer-motion";

export type WizardStep =
  | "database-selection"
  | "mysql-configuration"
  | "preview"
  | "transfer"
  | "complete";

const Home = () => {
  const [currentStep, setCurrentStep] =
    useState<WizardStep>("database-selection");
  const [accessFile, setAccessFile] = useState<File | null>(null);
  const [mysqlConfig, setMysqlConfig] = useState({
    host: "",
    port: "3306",
    username: "",
    password: "",
    database: "",
  });
  const [selectedItems, setSelectedItems] = useState<{
    tables: string[];
    queries: string[];
    procedures: string[];
  }>({
    tables: [],
    queries: [],
    procedures: [],
  });

  const handleNext = () => {
    const steps: WizardStep[] = [
      "database-selection",
      "mysql-configuration",
      "preview",
      "transfer",
      "complete",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const steps: WizardStep[] = [
      "database-selection",
      "mysql-configuration",
      "preview",
      "transfer",
      "complete",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6 flex flex-col">
      <header className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-3 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
            Access to MySQL Migration Tool
          </h1>
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1"
      >
        <Card className="shadow-xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-100">
              <WizardStepper currentStep={currentStep} />
            </div>

            <div className="p-6">
              <WizardContent
                currentStep={currentStep}
                accessFile={accessFile}
                setAccessFile={setAccessFile}
                mysqlConfig={mysqlConfig}
                setMysqlConfig={setMysqlConfig}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={
                  currentStep === "database-selection" ||
                  currentStep === "transfer"
                }
              >
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={
                  currentStep === "complete" || currentStep === "transfer"
                }
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
              >
                {currentStep === "preview" ? "Start Migration" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2023 Access to MySQL Migration Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
