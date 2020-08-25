### ATdoc
ATDoc is an automatic test documentation tool

#### Purpose
The purpose of Automatic Test Documentation is to use visual tools (rather than writing down cases on Google sheet directly) to create test case. Steps: 
- Create Mindmaps based on any information provided on:
  - Business Logic
  - Involved Modules
  - Relation/Dependency
- Create another mindmap for actions and outputs
- ATdoc will create test case sheet auto generating all possible combination of abovementioned scenarios, while it will:
  - consider illegal ops and filter/flag them
  - flag any legal missing paths
