import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileImage, Check, AlertCircle, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MriUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      const isValidType = file.type.includes('image') || file.name.toLowerCase().includes('.dcm');
      const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid Files",
        description: "Some files were rejected. Please upload DICOM or image files under 100MB.",
        variant: "destructive"
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete",
            description: "MRI scans uploaded successfully. Processing for AI analysis...",
          });
          setTimeout(() => {
            navigate("/patient/symptoms");
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">MRI Scan Upload</span>
            </div>
            <p className="text-muted-foreground">
              Upload your brain MRI scans for AI-powered migraine analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload MRI Scans</span>
                </CardTitle>
                <CardDescription>
                  Drag and drop your DICOM files or browse to select them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drop your MRI files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports DICOM, JPEG, PNG files up to 100MB each
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".dcm,.jpg,.jpeg,.png,.tiff"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Uploading files...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File List */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
                <CardDescription>
                  {uploadedFiles.length} file(s) ready for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No files uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-accent rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileImage className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / (1024 * 1024)).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-secondary" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Upload Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Recommended Scans:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• T1-weighted MRI</li>
                    <li>• T2-weighted MRI</li>
                    <li>• FLAIR sequences</li>
                    <li>• DWI (if available)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">File Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• DICOM format preferred</li>
                    <li>• Maximum 100MB per file</li>
                    <li>• High resolution images</li>
                    <li>• Recent scans (within 6 months)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="text-center mt-8">
            <Button
              onClick={simulateUpload}
              disabled={uploadedFiles.length === 0 || isUploading}
              size="lg"
              className="shadow-medical"
            >
              {isUploading ? "Processing..." : "Continue to Symptoms"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MriUpload;