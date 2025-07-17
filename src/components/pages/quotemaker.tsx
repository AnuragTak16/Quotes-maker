// 'use client';

// import { useState, useCallback, useRef } from 'react';
// import { Download, Mail, Palette } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { templates } from '../../lib/templates';

// export default function QuoteMaker() {
//   const [word, setWord] = useState('');
//   const [emotion, setEmotion] = useState('');
//   const [authorName, setAuthorName] = useState('');
//   const [useEmojis, setUseEmojis] = useState(true);
//   const [quote, setQuote] = useState('');
//   const [selectedTemplate, setSelectedTemplate] = useState('classic');
//   const quoteCardRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Mock quote generation function (replace with your API call)
//   const generateQuote = useCallback(async () => {
//     if (!word || !emotion) {
//       setQuote(
//         'Please enter a word and select an emotion to generate a quote.'
//       );
//       setError(null);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setQuote('');

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const emotions = {
//         happy: '😊',
//         sad: '😢',
//         hopeful: '🌟',
//         calm: '🕊️',
//         energetic: '⚡',
//         reflective: '🤔',
//         mysterious: '🌙',
//       };

//       const sampleQuotes = [
//         `${word} is the ${emotion} journey that shapes our destiny`,
//         `In every ${word}, there lies a ${emotion} truth waiting to be discovered`,
//         `The ${emotion} nature of ${word} reveals the beauty of existence`,
//         `When ${word} meets ${emotion} spirit, magic happens`,
//         `${word} whispers ${emotion} secrets to those who listen`,
//       ];

//       const randomQuote =
//         sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
//       const finalQuote = useEmojis ? `${randomQuote} ` : randomQuote;

//       setQuote(finalQuote);
//     } catch (err) {
//       console.error('Error generating quote:', err);
//       setError('Failed to generate quote. Please try again.');
//       setQuote('');
//     } finally {
//       setLoading(false);
//     }
//   }, [word, emotion, authorName, useEmojis]);

//   const handleDownload = useCallback(async () => {
//     if (quoteCardRef.current && quote) {
//       try {
//         const template =
//           templates.find((t) => t.id === selectedTemplate) || templates[0];
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d')!;
//         canvas.width = 800;
//         canvas.height = 600;

//         // Background gradient
//         const gradient = ctx.createLinearGradient(
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//         gradient.addColorStop(0, template.colors.bg1);
//         gradient.addColorStop(1, template.colors.bg2);
//         ctx.fillStyle = gradient;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         // Border
//         ctx.strokeStyle = template.colors.border;
//         ctx.lineWidth = 3;
//         ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

//         // Inner decorative border
//         ctx.strokeStyle = template.colors.border;
//         ctx.lineWidth = 1;
//         ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

//         // Quote text
//         ctx.fillStyle = template.colors.text;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.font = "italic 28px 'Times New Roman', serif";

//         const maxWidth = canvas.width - 120;
//         const words = quote.split(' ');
//         const lines = [];
//         let currentLine = '';

//         for (let i = 0; i < words.length; i++) {
//           const testLine = currentLine + words[i] + ' ';
//           const testWidth = ctx.measureText(testLine).width;

//           if (testWidth > maxWidth && currentLine !== '') {
//             lines.push(currentLine.trim());
//             currentLine = words[i] + ' ';
//           } else {
//             currentLine = testLine;
//           }
//         }

//         if (currentLine.trim()) {
//           lines.push(currentLine.trim());
//         }

//         // Calculate starting Y position to center the text
//         const lineHeight = 40;
//         const totalTextHeight = lines.length * lineHeight;
//         const startY = (canvas.height - totalTextHeight) / 2;

//         // Draw quote marks and text
//         ctx.font = "48px 'Times New Roman', serif";
//         ctx.fillText('“', canvas.width / 2 - 200, startY - 30);
//         ctx.fillText(
//           '”',
//           canvas.width / 2 + 200,
//           startY + totalTextHeight + 10
//         );

//         ctx.font = "italic 28px 'Times New Roman', serif";
//         lines.forEach((line, index) => {
//           ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
//         });

//         // Author
//         ctx.font = "18px 'Arial', sans-serif";
//         ctx.fillStyle = template.colors.author;
//         const displayAuthor = authorName ? `— ${authorName}` : '— Quote Maker';
//         ctx.fillText(displayAuthor, canvas.width / 2, canvas.height - 100);

//         // Decorative elements
//         ctx.fillStyle = template.colors.border;
//         ctx.beginPath();
//         ctx.arc(100, 100, 3, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(canvas.width - 100, 100, 3, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(100, canvas.height - 100, 3, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(canvas.width - 100, canvas.height - 100, 3, 0, 2 * Math.PI);
//         ctx.fill();

//         // Export
//         const image = canvas.toDataURL('image/png');
//         const link = document.createElement('a');
//         link.href = image;
//         const filenameAuthor = authorName
//           ? `_by_${authorName.replace(/\s/g, '-')}`
//           : '';
//         const templateName = template.name.replace(/\s/g, '-').toLowerCase();
//         link.download = `quote-${templateName}-${
//           word || 'word'
//         }${filenameAuthor}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } catch (error) {
//         console.error('Error generating image:', error);
//         alert('Failed to download quote. Please try again.');
//       }
//     } else {
//       alert('Please generate a quote first.');
//     }
//   }, [word, quote, authorName, selectedTemplate]);

//   const handleShareEmail = useCallback(() => {
//     if (quote) {
//       const subject = encodeURIComponent('Check out this quote I made!');
//       const body = encodeURIComponent(
//         `"${quote}"\n\n${
//           authorName ? `- ${authorName}` : '- Quote Maker'
//         }\n\nMade with the Quote Maker app.`
//       );
//       window.location.href = `mailto:?subject=${subject}&body=${body}`;
//     }
//   }, [quote, authorName]);

//   const currentTemplate =
//     templates.find((t) => t.id === selectedTemplate) || templates[0];

//   return (
//     <main className='min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4'>
//       <div className='max-w-4xl mx-auto'>
//         <div className='text-center mb-8'>
//           <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mb-6 text-center animate-fade-in'>
//             ThinkWords{' '}
//           </h1>

//           <p className='text-lg text-black max-w-2xl mx-auto'>
//             Transform your words and emotions into beautiful, shareable quotes
//             with customizable templates
//           </p>
//         </div>

//         <div className='grid md:grid-cols-2 gap-6'>
//           {/* Input Form */}
//           <Card className='bg-white/80 backdrop-blur-sm shadow-lg border-0'>
//             <CardHeader className='text-center'>
//               <CardTitle className='text-2xl font-bold text-black'>
//                 Create Your Quote
//               </CardTitle>
//               <CardDescription className='text-black'>
//                 Enter your inspiration and let AI craft the perfect quote
//               </CardDescription>
//             </CardHeader>

//             <CardContent className='space-y-4'>
//               <div className='space-y-2'>
//                 <Label
//                   htmlFor='word'
//                   className='text-sm font-medium text-black'
//                 >
//                   Your Word
//                 </Label>
//                 <Input
//                   id='word'
//                   type='text'
//                   placeholder='e.g., Journey, Dream, Silence'
//                   value={word}
//                   onChange={(e) => setWord(e.target.value)}
//                   maxLength={20}
//                   className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'
//                 />
//               </div>

//               <div className='space-y-2 relative z-10'>
//                 <Label
//                   htmlFor='emotion'
//                   className='text-sm font-medium text-black'
//                 >
//                   Emotion
//                 </Label>
//                 <Select value={emotion} onValueChange={setEmotion}>
//                   <SelectTrigger className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'>
//                     <SelectValue placeholder='Select an emotion' />
//                   </SelectTrigger>
//                   <SelectContent className='absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg'>
//                     <SelectItem value='happy'>😊 Happy</SelectItem>
//                     <SelectItem value='sad'>😢 Sad</SelectItem>
//                     <SelectItem value='hopeful'>🌟 Hopeful</SelectItem>
//                     <SelectItem value='calm'>🕊️ Calm</SelectItem>
//                     <SelectItem value='energetic'>⚡ Energetic</SelectItem>
//                     <SelectItem value='reflective'>🤔 Reflective</SelectItem>
//                     <SelectItem value='mysterious'>🌙 Mysterious</SelectItem>
//                     <SelectItem value='love'>❤️ Love</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className='space-y-2'>
//                 <Label
//                   htmlFor='authorName'
//                   className='text-sm font-medium text-black'
//                 >
//                   Author Name (Optional)
//                 </Label>
//                 <Input
//                   id='authorName'
//                   type='text'
//                   placeholder='e.g., John Doe'
//                   value={authorName}
//                   onChange={(e) => setAuthorName(e.target.value)}
//                   maxLength={50}
//                   className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'
//                 />
//               </div>

//               <div className='space-y-2'>
//                 <Label
//                   htmlFor='template'
//                   className='text-sm font-medium text-black'
//                 >
//                   <Palette className='inline w-4 h-4 mr-1' />
//                   Template Style
//                 </Label>
//                 <Select
//                   value={selectedTemplate}
//                   onValueChange={setSelectedTemplate}
//                 >
//                   <SelectTrigger className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'>
//                     <SelectValue placeholder='Choose a template' />
//                   </SelectTrigger>
//                   <SelectContent className='absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg'>
//                     {templates.map((template) => (
//                       <SelectItem key={template.id} value={template.id}>
//                         {template.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className='flex items-center space-x-2'>
//                 <Checkbox
//                   id='useEmojis'
//                   checked={useEmojis}
//                   onCheckedChange={(checked) => setUseEmojis(Boolean(checked))}
//                 />
//                 <Label
//                   htmlFor='useEmojis'
//                   className='text-sm font-medium text-black cursor-pointer'
//                 >
//                   Include Emojis
//                 </Label>
//               </div>

//               <Button
//                 onClick={generateQuote}
//                 className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
//                 disabled={loading || !word || !emotion}
//               >
//                 {loading ? 'Generating...' : ' Generate Quote'}
//               </Button>

//               {error && (
//                 <div
//                   className='text-red-500 text-center text-sm bg-red-50 p-2 rounded'
//                   role='alert'
//                 >
//                   {error}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Quote Display */}
//           <Card className='bg-white/80 backdrop-blur-sm shadow-lg border-0'>
//             <CardHeader className='text-center'>
//               <CardTitle className='text-2xl font-bold text-gray-800'>
//                 Your Quote
//               </CardTitle>
//               <CardDescription className='text-'>
//                 Preview with{' '}
//                 {templates.find((t) => t.id === selectedTemplate)?.name}{' '}
//                 template
//               </CardDescription>
//             </CardHeader>

//             <CardContent className='space-y-4'>
//               {quote ? (
//                 <>
//                   <div
//                     ref={quoteCardRef}
//                     className='p-6 text-center rounded-lg shadow-md min-h-[200px] flex flex-col justify-center'
//                     style={{
//                       background: `linear-gradient(135deg, ${currentTemplate.colors.bg1}, ${currentTemplate.colors.bg2})`,
//                       border: `2px solid ${currentTemplate.colors.border}`,
//                       color: currentTemplate.colors.text,
//                     }}
//                   >
//                     <p className='text-lg md:text-xl font-semibold italic leading-relaxed mb-4'>
//                       &quot;{quote}&quot;
//                     </p>
//                     <p className='text-sm opacity-80'>
//                       {authorName ? `— ${authorName}` : '— Quote Maker'}
//                     </p>
//                   </div>

//                   <div className='flex flex-col sm:flex-row gap-2'>
//                     <Button
//                       onClick={handleDownload}
//                       className='flex-1 flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 transition-colors'
//                     >
//                       <Download className='h-4 w-4' />
//                       Download PNG
//                     </Button>
//                     <Button
//                       onClick={handleShareEmail}
//                       className='flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors'
//                     >
//                       <Mail className='h-4 w-4' />
//                       Share Email
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <div className='text-center text-gray-500 py-12'>
//                   <p className='text-lg mb-2'>No quote generated yet</p>
//                   <p className='text-sm'>
//                     Fill in the form and click &quot;Generate Quote&quot; to
//                     create your masterpiece!
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Template Preview */}
//         <div className='mt-8'>
//           <h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>
//             Template Styles
//           </h3>
//           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
//             {templates.map((template) => (
//               <div
//                 key={template.id}
//                 className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
//                   selectedTemplate === template.id
//                     ? 'ring-2 ring-purple-500 scale-105'
//                     : 'hover:scale-105'
//                 }`}
//                 style={{
//                   background: `linear-gradient(135deg, ${template.colors.bg1}, ${template.colors.bg2})`,
//                   borderColor: template.colors.border,
//                 }}
//                 onClick={() => setSelectedTemplate(template.id)}
//               >
//                 <div className='text-center'>
//                   <div
//                     className='text-xs font-semibold mb-1'
//                     style={{ color: template.colors.text }}
//                   >
//                     Sample Quote
//                   </div>
//                   <div
//                     className='text-xs opacity-80'
//                     style={{ color: template.colors.author }}
//                   >
//                     {template.name}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
