import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { EditableCard } from "@/components/editable-card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { 
  fetchPageContent, 
  updatePageContent, 
  parsePageContent,
  type BasicPageContent 
} from "@/lib/page-content";

// Import retrospective images
import golocansIsland from "../assets/golocans-island.png";
import retroBoardWeek34 from "../assets/retro-board-week3-4.png";

export default function RetrospectivePage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };
  
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['/api/pages/retrospective'],
    queryFn: () => fetchPageContent('retrospective')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ field, content }: { field: string, content: string }) => {
      if (!pageData) throw new Error("Page data not available");
      const parsedContent = parsePageContent<BasicPageContent>(pageData.content);
      let updatedContent: BasicPageContent;
      
      switch (field) {
        case 'intro':
          updatedContent = {
            ...parsedContent,
            intro: {
              ...parsedContent.intro,
              content
            }
          };
          break;
        case 'placeholder':
          updatedContent = {
            ...parsedContent,
            placeholder: content
          };
          break;
        default:
          throw new Error(`Unknown field: ${field}`);
      }
      
      return updatePageContent('retrospective', { 
        content: JSON.stringify(updatedContent)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages/retrospective'] });
    },
  });

  const handleSaveIntro = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ field: 'intro', content });
  };

  const handleSavePlaceholder = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ field: 'placeholder', content });
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full mb-8" />
            <Skeleton className="h-40" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pageData) return <div>Error loading page content</div>;

  const content = parsePageContent<BasicPageContent>(pageData.content);

  return (
    <div>
      <header className="mb-6">
        <h1 className="section-heading">{pageData.title}</h1>
      </header>
      
      <Card>
        <CardContent className="p-6">
          <div>
            <div className="accordion-container">
              <div className="rounded-md overflow-hidden bg-sky-100 mb-2">
                <div className="p-4 cursor-pointer flex justify-between items-center" 
                     onClick={() => toggleSection('week1-2')}>
                  <h3 className="text-lg font-medium text-primary">Week 1 & Week 2</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`p-4 bg-white ${openSection === 'week1-2' ? '' : 'hidden'}`}>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-blue-100 to-transparent p-2 rounded-md">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">What Went Well</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Successfully reached out to three potential sponsors and selected one that aligns with our project vision.</li>
                        <li>Conducted a collaborative brainstorming session where all members actively contributed.</li>
                        <li>Initiated usage of project management tools like Jira, helping team members upskill in agile tracking.</li>
                        <li>Completed foundational deliverables including team charter, member bios, and project setup documents.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-amber-100 to-transparent p-2 rounded-md">
                        <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Challenges Encountered</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Sponsor outreach began later than ideal, limiting early planning opportunities.</li>
                        <li>Inconsistent meeting schedules occasionally disrupted coordination efforts.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-green-100 to-transparent p-2 rounded-md">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Steps for Improvement</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Implement a consistent meeting schedule to maintain alignment.</li>
                        <li>Set clear timelines and expectations for each task.</li>
                        <li>Increase transparency by making better use of shared tracking tools like Trello and Jira.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-purple-100 to-transparent p-2 rounded-md">
                        <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Next Sprint Objectives</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Hold a focused sprint planning session with defined roles, deliverables, and deadlines.</li>
                        <li>Enhance communication and time management to ensure all team commitments are met effectively.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md overflow-hidden bg-sky-100 mb-2">
                <div className="p-4 cursor-pointer flex justify-between items-center" 
                     onClick={() => toggleSection('week3-4')}>
                  <h3 className="text-lg font-medium text-primary">Week 3 & Week 4</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`p-4 bg-white ${openSection === 'week3-4' ? '' : 'hidden'}`}>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-md flex justify-center mb-6">
                      <div className="max-w-full">
                        <img 
                          src={retroBoardWeek34} 
                          alt="Week 3-4 Retrospective Board" 
                          className="rounded-lg shadow-md max-w-full" 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-blue-100 to-transparent p-2 rounded-md">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">What Went Well</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Acted on professor feedback from the last presentation, which clarified project direction.</li>
                        <li>Strengthened client collaboration after class discussions, building stronger sponsor relations.</li>
                        <li>Set clear goals and deadlines early in the sprint, which supported organized progress.</li>
                        <li>Tasks were assigned efficiently, leading to reduced pressure and smoother execution.</li>
                        <li>Progress tracking tools (velocity charts, info radiators) provided visual clarity on status.</li>
                        <li>Communication with the sponsor led to a clearer understanding of the project scope.</li>
                        <li>The team showed increased enthusiasm and productivity as momentum built.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-amber-100 to-transparent p-2 rounded-md">
                        <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Challenges Encountered</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Graduation events caused delays in task execution due to divided attention.</li>
                        <li>Irregular and unorganized meeting agendas led to reduced productivity.</li>
                        <li>Initial uncertainty regarding platform selection and website structuring created hesitation.</li>
                        <li>Handing over responsibilities to a new team member required adjustments and onboarding.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-green-100 to-transparent p-2 rounded-md">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Steps for Improvement</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Improve communication during content/document editing to maintain alignment.</li>
                        <li>Establish clear agendas before meetings to keep discussions efficient and focused.</li>
                        <li>Avoid lengthy meetings by having quicker check-ins or immediate async updates.</li>
                        <li>Match tasks to team members' strengths through internal skill-mapping.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-purple-100 to-transparent p-2 rounded-md">
                        <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Next Sprint Objectives</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Finalize the platform for client work and initiate website structure development.</li>
                        <li>Maintain a consistent and clear meeting structure with documented agendas.</li>
                        <li>Allocate responsibilities based on individual strengths for better task ownership.</li>
                        <li>Strengthen internal alignment and avoid delays through time-efficient collaboration.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md overflow-hidden bg-sky-100 mb-2">
                <div className="p-4 cursor-pointer flex justify-between items-center" 
                     onClick={() => toggleSection('week5-6')}>
                  <h3 className="text-lg font-medium text-primary">Week 5 & Week 6</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`p-4 bg-white ${openSection === 'week5-6' ? '' : 'hidden'}`}>
                  <div className="space-y-6">
                    <div className="bg-pink-50 p-4 rounded-md flex justify-center mb-6">
                      <div className="max-w-full">
                        <img 
                          src={golocansIsland} 
                          alt="Retrospective in the Island of Golocans" 
                          className="rounded-lg shadow-md max-w-full" 
                        />
                      </div>
                    </div>
                    
                    <div className="prose max-w-none mt-4">
                      <h3 className="text-xl font-semibold text-primary mb-4">Retrospective in the Island of Golocans</h3>
                      <p className="text-gray-700 mb-4">
                        For our Week 5-6 retrospective, we used the "Island of Golocans" retrospective format to reflect 
                        on our project journey in a creative, visual way. This approach helped us identify what went well, 
                        what challenges we faced, and what lessons we learned as we continue developing The Knots Studio website.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-amber-100 to-transparent p-2 rounded-md">
                        <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">The Island (What we achieved)</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Team was adaptable in adjusting to changing tasks and priorities</li>
                        <li>Decision to use Wix for website development provided a good balance of functionality and ease of use</li>
                        <li>Smooth coordination between team members during platform selection and initial design</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-blue-100 to-transparent p-2 rounded-md">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Treasure (What went well)</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Excellent task distribution with clear deliverables for each team member</li>
                        <li>Timely updates to sponsor about progress and roadblocks</li>
                        <li>Client meeting to discuss Wix website template was productive and decisive</li>
                        <li>Successfully created and refined the product backlog according to client needs</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-red-100 to-transparent p-2 rounded-md">
                        <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Pirates on the shore (What didn't go well)</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Limited client availability caused some delays in getting timely feedback</li>
                        <li>Design misalignment: initial website design required adjustments to better match client's brand vision</li>
                        <li>Skill gap with Wix platform - many team members needed to refresh their knowledge</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-purple-100 to-transparent p-2 rounded-md">
                        <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Compass (Lessons Learned)</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Importance of scheduling regular client meetings well in advance</li>
                        <li>Value of creating detailed documentation for implementation specifications</li>
                        <li>Importance of task prioritization and tracking progress through agile methodology</li>
                        <li>Need for proactive skill development in tools and platforms being used</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3 bg-gradient-to-r from-green-100 to-transparent p-2 rounded-md">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-primary text-lg">Wind in Our Sails (Action points for the future)</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-secondary">
                        <li>Upskill using tutorials for better Wix design and implementation</li>
                        <li>Implement more flexible meeting schedules to accommodate client availability</li>
                        <li>Document decisions more thoroughly to ensure team alignment</li>
                        <li>Have clearer role assignments for upcoming tasks with measurable outcomes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md overflow-hidden bg-sky-100 mb-2">
                <div className="p-4 cursor-pointer flex justify-between items-center" 
                     onClick={() => toggleSection('week7-8')}>
                  <h3 className="text-lg font-medium text-primary">Week 7 & Week 8</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`p-4 bg-white ${openSection === 'week7-8' ? '' : 'hidden'}`}>
                  <textarea 
                    className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md" 
                    placeholder="Enter retrospective notes for Week 7 & Week 8..."></textarea>
                </div>
              </div>
              
              <div className="rounded-md overflow-hidden bg-sky-100 mb-2">
                <div className="p-4 cursor-pointer flex justify-between items-center" 
                     onClick={() => toggleSection('week9-10')}>
                  <h3 className="text-lg font-medium text-primary">Week 9 & Week 10</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`p-4 bg-white ${openSection === 'week9-10' ? '' : 'hidden'}`}>
                  <textarea 
                    className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md" 
                    placeholder="Enter retrospective notes for Week 9 & Week 10..."></textarea>
                </div>
              </div>
              
              <div className="rounded-md overflow-hidden bg-sky-100 mb-2">
                <div className="p-4 cursor-pointer flex justify-between items-center" 
                     onClick={() => toggleSection('week11-12')}>
                  <h3 className="text-lg font-medium text-primary">Week 11 & Week 12</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`p-4 bg-white ${openSection === 'week11-12' ? '' : 'hidden'}`}>
                  <textarea 
                    className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md" 
                    placeholder="Enter retrospective notes for Week 11 & Week 12..."></textarea>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
