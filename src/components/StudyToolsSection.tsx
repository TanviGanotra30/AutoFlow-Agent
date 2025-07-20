import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Brain, FileText } from 'lucide-react';

const StudyToolsSection = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async (type: string) => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      let result = '';
      switch (type) {
        case 'flashcards':
          result = `Flashcard 1: Q: What is ${topic}? A: ${topic} is a key concept in learning optimization.\n\nFlashcard 2: Q: Why is ${topic} important? A: It helps improve study efficiency and retention.`;
          break;
        case 'summary':
          result = `Summary of ${topic}:\n\n${topic} is a fundamental concept that plays a crucial role in modern learning methodologies. Key points include:\n\n• Enhanced comprehension through structured approach\n• Improved retention rates\n• Optimized study sessions\n• Data-driven insights`;
          break;
        case 'quiz':
          result = `Quiz on ${topic}:\n\n1. What is the primary benefit of ${topic}?\na) Faster learning\nb) Better retention\nc) Both a and b\nd) None of the above\n\n2. How does ${topic} improve study efficiency?\n[Short answer question]`;
          break;
      }
      setGeneratedContent(result);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tools</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the power of AI-generated study materials tailored to your needs.
          </p>
        </div>
        
        <Card className="bg-slate-900/50 border-slate-700 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center">Generate Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Input
                  placeholder="Enter your study topic..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              
              <Tabs defaultValue="flashcards" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                  <TabsTrigger value="flashcards" className="data-[state=active]:bg-cyan-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Flashcards
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="data-[state=active]:bg-cyan-600">
                    <FileText className="w-4 h-4 mr-2" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="data-[state=active]:bg-cyan-600">
                    <Brain className="w-4 h-4 mr-2" />
                    Quiz
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="flashcards" className="space-y-4">
                  <Button 
                    onClick={() => generateContent('flashcards')}
                    disabled={!topic.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Flashcards'}
                  </Button>
                </TabsContent>
                
                <TabsContent value="summary" className="space-y-4">
                  <Button 
                    onClick={() => generateContent('summary')}
                    disabled={!topic.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Summary'}
                  </Button>
                </TabsContent>
                
                <TabsContent value="quiz" className="space-y-4">
                  <Button 
                    onClick={() => generateContent('quiz')}
                    disabled={!topic.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Quiz'}
                  </Button>
                </TabsContent>
              </Tabs>
              
              {generatedContent && (
                <div className="mt-6">
                  <Textarea
                    value={generatedContent}
                    readOnly
                    className="bg-slate-800 border-slate-600 text-white min-h-[200px]"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StudyToolsSection;