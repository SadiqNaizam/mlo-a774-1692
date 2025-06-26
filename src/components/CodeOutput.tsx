import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from 'lucide-react';
import { toast } from "sonner";

interface CodeOutputProps {
  htmlCode: string;
  cssCode: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ htmlCode, cssCode }) => {
  const [isCopied, setIsCopied] = useState(false);
  console.log('CodeOutput loaded');

  const handleCopy = () => {
    const fullCode = `<!-- HTML -->\n${htmlCode}\n\n<style>\n/* CSS */\n${cssCode}\n</style>`;

    navigator.clipboard.writeText(fullCode).then(() => {
      setIsCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
      toast.error("Failed to copy code.");
    });
  };

  const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
    <pre className="p-4 rounded-md bg-gray-900 text-white overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generated Code</CardTitle>
        <CardDescription>
          Here is the HTML and CSS for your custom animation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="html" className="mt-4">
            <CodeBlock code={htmlCode} />
          </TabsContent>
          <TabsContent value="css" className="mt-4">
            <CodeBlock code={cssCode} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopy} className="w-full" disabled={isCopied}>
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeOutput;