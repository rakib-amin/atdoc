// https://stackoverflow.com/a/27125580
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
} 

function getClassPkgFromTestCase(testCaseName){
  // com.my.company.app.some.pkg.TestClass.testMethod
  var methodName = testCaseName.substring(testCaseName.lastIndexOf(".")).split(".")[1];
  var classPath = testCaseName.substring(0, testCaseName.lastIndexOf("."));
  var pkgName = classPath.substring(0, classPath.lastIndexOf("."));
  var className = classPath.split(pkgName)[1].split(".")[1]
}

function archiveSheetByWeek_() {
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   // Sheet[]
   var sheets_ = ss.getSheets();
   // for alert / prompts
   var ui = SpreadsheetApp.getUi();
   // Sheet[] fulfilling criteria
   var sheets_week = new Array()
   
   // map for saving values
   var theMap = {}
   var rowNames = []
   
   var thisWeek = new Date().getWeek();
   var dateNow = new Date(); 
   
   // for all sheets name like 30/07 01/08 etc.
   for (var i = 0, j = 0; i < sheets_.length; i++) {
      var date_ = sheets_[i].getName().split(" ")[0].split("/");
      var dateField = String(date_[0]).padStart(2, '0');
      var monthField = String(date_[1]).padStart(2, '0');
      var dateString = dateNow.getFullYear() + "-" + monthField + "-" + dateField +"T00:00:00+08:00"
      var week_ = new Date(dateString).getWeek(); 
      if(thisWeek == week_) {
        sheets_week[j] = sheets_[i]
        j += 1
      }
      if(week_ < thisWeek) break;
   }
   
   if(sheets_week.length < 1) { 
     ui.alert("No Sheet found for week: " + thisWeek, ui.ButtonSet.OK);
     return
   }
   
   var rowC = 0;
   for (var i = 0; i < sheets_week.length; i++) { 
     // IMPORTANT : always use .getDisplayValues()
     var values = sheets_week[i].getDataRange().getDisplayValues()
     for (var j = 0, k = 0; j < values.length; j++) {
       if(sheets_week[i].getRange(j+1, 1).isBlank()){
         // end of valid data
         break;
       } else {
         if(theMap[values[j][0]]) {
           theMap[values[j][0]]['col_B'] +=  (", " + (values[j][1] ? values[j][1] : "NotFound"));           
           theMap[values[j][0]]['col_C'] +=  (", " + (values[j][2] ? values[j][2] : "NotFound"));           
           theMap[values[j][0]]['col_D'] +=  (", " + (values[j][3] ? values[j][3] : "NotFound"));           
         } else {
           theMap[values[j][0]] = {
              col_B: values[j][1] ? values[j][1] : "NotFound", 
              col_C : values[j][2] ? values[j][2] : "NotFound", 
              col_D : values[j][3] ? values[j][3] : "NotFound",  
            };
           rowNames[rowC] = values[j][0];
           rowC++;
         }
       }
     }
   }
   
   var col_B_rows = new Array()
   var col_C_rows = new Array()
   var col_D_rows = new Array()
   
   for(var n = 0; n < rowC; n++) {
     col_B_rows[n] = theMap[rowNames[n]]['col_B'] 
     col_C_rows[n] = theMap[rowNames[n]]['col_C'] 
     col_D_rows[n] = theMap[rowNames[n]]['col_D'] 
   }
   
   var newSheet = ss.getSheetByName("Week_" + thisWeek);
   if(!newSheet) newSheet = ss.insertSheet("Week_" + thisWeek);
   newSheet.getRange("A1:E1").setValues([["Col_A", "Col_B" ,"Col_C" ,"Col_D"]])
   newSheet.getRange("A2:A"+(rowC+1)).setValues(rowNames.map(function(e){ return [e]; }))
   newSheet.getRange("B2:B"+(rowC+1)).setValues(col_B_rows.map(function(e){ return [e]; }))
   newSheet.getRange("C2:C"+(rowC+1)).setValues(col_C_rows.map(function(e){ return [e]; }))
   newSheet.getRange("D2:D"+(rowC+1)).setValues(col_D_rows.map(function(e){ return [e]; }))
   
   newSheet.getRange("A1:E1").setFontWeight("bold");
   
   // delete sheets from this week
   var response = ui.alert('Are you sure you want to Delete all sheets from week: ' + thisWeek + '?', ui.ButtonSet.YES_NO);
   if (response == ui.Button.YES) {
     for (var i = 0; i < sheets_week.length; i++) {
       ss.deleteSheet(sheets_week[i])
     }
   }
}

function collecEmailtListFromFormFeed_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // rename the formfeed sheet to EmailList
  var emailListSheet = ss.getSheetByName("EmailList");
  
  var range_input = emailListSheet.getRange("B2:B").getValues();
  var lastRow = range_input.filter(String).length;
  var emails = emailListSheet.getRange(2, 2, lastRow).getValues();
  var subscribers = '\n';
  for (var i = 0; i < lastRow; i++) {
     if(i != lastRow - 1) subscribers += (emails[i] + "," + "\n");
     else subscribers += emails[i] + "\n";
  } 
  var alertUi = SpreadsheetApp.getUi();
  alertUi.alert(
     'Email list',
      subscribers,
      alertUi.ButtonSet.OK);
    
}

function formatSheet_() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var currentSheet = ss.getActiveSheet();
  
  for (var i = 1; i <= 100; i++)  {
     currentSheet.getRange(i, 2).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  }
  
  // sort(colNum)
  currentSheet.sort(1);
  
  // move header to row 1
  var values = currentSheet.getDataRange().getValues();
  for (var i = 0; i < values.length; i++) {
      if(values[i][0] == "Title" || values[i][0] == "SL No.") {
        // moveRows(source, dest) 
        currentSheet.moveRows(currentSheet.getRange(i+1,1), 1);
        break;
      }
  }
  
  // bold
  currentSheet.getRange("A1:H1").setFontWeight("bold");
  
  // set validation
  var cell = currentSheet.getRange('F2:F100');
  var cell2 = currentSheet.getRange('G2:G100');
  var range = ss.getSheetByName("DataValidations").getRange('B2:B10');
  var range2 = ss.getSheetByName("DataValidations").getRange('C2:C10');
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(range).build();
  var rule2 = SpreadsheetApp.newDataValidation().requireValueInRange(range2).build();
  cell.setDataValidation(rule);
  cell2.setDataValidation(rule2);
}
