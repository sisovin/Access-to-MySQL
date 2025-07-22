import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import DatabasePreview from "./DatabasePreview";
import TransferProgress from "./TransferProgress";

// Step components (placeholders for now)
const DatabaseSelection = () => {
  return (
    <div className="space-y-6 bg-white">
      <h2 className="text-2xl font-semibold">Select Access Database</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-lg font-medium">
            Drag and drop your Access database file here
          </p>
          <p className="text-sm text-gray-500">or click to browse</p>
        </div>
      </div>
      <div className="mt-4">
        <input
          type="file"
          className="hidden"
          id="database-file"
          accept=".mdb,.accdb"
        />
        <Button className="w-full">Browse Files</Button>
      </div>
    </div>
  );
};

const MySQLConfiguration = () => {
  return (
    <div className="space-y-6 bg-white">
      <h2 className="text-2xl font-semibold">MySQL Configuration</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="host" className="text-sm font-medium">
              Host
            </label>
            <input
              type="text"
              id="host"
              placeholder="localhost"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="port" className="text-sm font-medium">
              Port
            </label>
            <input
              type="text"
              id="port"
              placeholder="3306"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="database" className="text-sm font-medium">
            Database Name
          </label>
          <input
            type="text"
            id="database"
            placeholder="my_database"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="root"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <Button className="w-full">Test Connection</Button>
      </div>
    </div>
  );
};

const MigrationComplete = () => {
  return (
    <div className="space-y-6 bg-white text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-4">
          <Check className="h-12 w-12 text-green-600" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Migration Complete!</h2>
      <p className="text-gray-600">
        Your Access database has been successfully migrated to MySQL.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Migration Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-sm text-gray-500">Tables Migrated</p>
            <p className="font-medium">24</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Queries Migrated</p>
            <p className="font-medium">12</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Records Transferred</p>
            <p className="font-medium">15,432</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time Elapsed</p>
            <p className="font-medium">2m 34s</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button>Download Migration Report</Button>
      </div>
    </div>
  );
};

interface WizardContentProps {
  currentStep?: number;
  onNextStep?: () => void;
  onPrevStep?: () => void;
}

const WizardContent: React.FC<WizardContentProps> = ({
  currentStep = 0,
  onNextStep = () => {},
  onPrevStep = () => {},
}) => {
  // Steps content components
  const steps = [
    <DatabaseSelection key="database-selection" />,
    <MySQLConfiguration key="mysql-configuration" />,
    <DatabasePreview key="database-preview" />,
    <TransferProgress key="transfer-progress" />,
    <MigrationComplete key="migration-complete" />,
  ];

  // Step titles
  const stepTitles = [
    "Database Selection",
    "MySQL Configuration",
    "Database Preview",
    "Transfer Progress",
    "Complete",
  ];

  // Determine if buttons should be shown
  const showPrevButton = currentStep > 0;
  const showNextButton = currentStep < steps.length - 1;
  const isLastStep = currentStep === steps.length - 1;
  const isTransferStep = currentStep === 3; // Transfer Progress step

  return (
    <div className="w-full max-w-5xl mx-auto bg-background">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          {/* Current step content */}
          <div className="min-h-[500px]">{steps[currentStep]}</div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {showPrevButton && !isTransferStep && (
              <Button
                variant="outline"
                onClick={onPrevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
            )}
            {!showPrevButton && <div></div>}

            {showNextButton && !isTransferStep && (
              <Button onClick={onNextStep} className="flex items-center gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {isLastStep && (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.location.reload()}
              >
                Start New Migration
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WizardContent;
