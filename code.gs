// [START mindmup2table]
/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

var CREATE_INSTRUCTION = "\nPlease Copy (Ctrl/Cmd + C) the node of a mindmup and" 
               + " paste (Ctrl/Cmd + V) here first. You'll see it will create a List.\n"
               + "Then Go to Add-ons > MindmupToTable > Create Table from List.\n";
var GOOGLE_DOC_NEST_LVL_EXCEEDED = "\nGoogle Doc CAN NOT create more than 10 Nesting levels. \nSo your "
                           + "actual mindmup may contain more information but it is lost now. Select a node with smaller"
                           + " number of nesting levels (generation of children).\n";
var HELP_VIDEO_TEXT = "Click me for Help.";
var HELP_VIDEO_URL = "blah";
var MOUSE_SELECT_WONT_WORK = "N.B DO NOT try to select using mouse pointer (Google App Script Issue).\n";

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Create Table from List', 'createTableFromList')
      .addToUi();
  createTableFromList();
}

function onInstall(e) {
  onOpen(e);
  createTableFromList();
}

function onEdit(e) {
  createTableFromList();
}

function createTableFromList() {
  
  var body = DocumentApp.getActiveDocument().getBody();
  var header = (DocumentApp.getActiveDocument().getHeader()) ? DocumentApp.getActiveDocument().getHeader() 
                                                             : DocumentApp.getActiveDocument().addHeader();
  
  if(body.getListItems().length < 1) {
    cleanScreen();
    header.appendParagraph(CREATE_INSTRUCTION);
    header.editAsText().setForegroundColor("#4F4F4F");
    header.appendParagraph(HELP_VIDEO_TEXT).setLinkUrl(HELP_VIDEO_URL);
    return;
  }
  
  var listArray = body.getListItems();
  
  var arr2d = [];
  var minCol = 0;

  for (var i = 0, minRow = 0, j = 0; i < listArray.length; i++, j++) {
    
    arr2d[i] = new Array();
    
    if(minCol < listArray[i].getNestingLevel()) { 
      minCol = listArray[i].getNestingLevel();
    }
    
    if(listArray[i].getNestingLevel() < j) {
      minRow++;
      j = listArray[i].getNestingLevel();
      for (var k = 0; k < j; k++) {
        arr2d[minRow].push("");
      }
      arr2d[minRow].push(listArray[i].getText());
    } else {
      arr2d[minRow].push(listArray[i].getText());
    }
  }
  
  if (minCol >= 9) {
    cleanScreen();
    header.appendParagraph(GOOGLE_DOC_NEST_LVL_EXCEEDED).editAsText().setForegroundColor("#EE0000");
    return;
  }
  
  cleanScreen();
  
  header.setText(getInstruction(minCol, minRow));
  header.editAsText().setFontSize(9);
  header.editAsText().setForegroundColor("#4F4F4F");
  header.appendParagraph(MOUSE_SELECT_WONT_WORK).editAsText().setForegroundColor("#EE0000");
  header.appendParagraph(HELP_VIDEO_TEXT).setLinkUrl(HELP_VIDEO_URL);
  
  body.appendTable(arr2d);
  
}

function cleanScreen() {
  DocumentApp.getActiveDocument().getBody().setText("");
  DocumentApp.getActiveDocument().getHeader().setText("");
}

function getInstruction(minCol, minRow) {
  
  return "\nMinimum Column needed in Category Section : " + (minCol + 1) + "\n" 
               + "Minimum Row needed in Category Section : " + (minRow + 1) + "\n\n" 
               + "Usage: \n- First add the necessary columns and rows in your Test Case Sheet (Use QA Case Add-on),\n" 
               + "- Then Ctrl/Command + A to select the table in this doc\n"
               + "- Then Copy/Paste the Table in your Test Case Sheet\n";
}

// [END mindmup2table]
