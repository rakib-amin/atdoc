### ATdoc (Concept)
ATDoc is an automatic test documentation tool

#### Purpose
The purpose of Automatic Test Documentation is to use visual tools (rather than writing down cases on Google sheet directly) to create test case. Steps: 
- Create Mindmaps based on any information provided on: (Using https://www.mindmup.com/)
  - Business Logic
  - Involved Modules
  - Relation/Dependency
- ATdoc will create test case sheet auto generating all possible combination of abovementioned scenarios:
  - convert mindmap to table and manage google sheet ([list2Table.gs](list2Table.gs) and [sheet.gs](sheet.gs)
  - consider illegal ops and filter/flag them (TODO)
  - flag any legal missing paths (TODO)
  
#### Ref
- https://en.wikipedia.org/wiki/Software_test_documentation
- https://www.istqb.org/downloads/send/7-advanced-level-documents/303-advanced-level-syllabus-2019-1-test-analyst.html
- https://www.istqb.org/downloads/send/61-mobile-application-testing/251-mobile-application-testing-specialist-syllabus.html
- https://www.istqb.org/downloads/send/59-performance-testing/239-istqb-ctfl-pt-syllabus-2018-ga.html
- https://www.istqb.org/downloads/send/62-acceptance-testing/257-acceptance-testing-specialist-syllabus.html 
- https://www.istqb.org/downloads/send/65-advanced-level-agile-technical-tester/289-istqb-ctal-att_syllabus_v1-0.html
- https://www.istqb.org/downloads/send/48-advanced-level-test-automation-engineer-documents/201-advanced-test-automation-engineer-syllabus-ga-2016.html
