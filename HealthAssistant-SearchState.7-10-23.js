    var ibmdb = require('ibm_db');
/**
  * Based on Code by Henrik Loeser, IBM
  * Written by TechSales America
  * https://console.bluemix.net/docs/tutorials/sql-database.html
  */
function queryProcedure(dsn, state, code) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    /** SELECT "PROCEDURE", "ABOUT", "STATE", "IN_NETWORK_COST", "OUT_OF_NETWORK_COST", "MEDICAL_CODE" FROM "HEALTHDEMO"."PROCEDURE";*/
    var data=conn.querySync("SELECT PROCEDURE, ABOUT, STATE, IN_NETWORK_COST, OUT_OF_NETWORK_COST, MEDICAL_CODE from HEALTHDEMO.PROCEDURE where (STATE = ? and MEDICAL_CODE = ?)", [state, code]);
    conn.closeSync();
    return {result : "Results:", data : data, procedure:procedure, in_network_cost:in_network_cost, out_of_network_cost:out_of_network_cost, e:0};
   // return {result : data procedure , in_network_cost, out_of_network_cost };
 } catch (e) {
     //return { dberror : e }
     return{result : "No Results Found", data:data, state:state, code:code, e:e}
 }
}

function queryCodeByProcedure(dsn, procedure) {
    try {    
    var conn=ibmdb.openSync(dsn);
    var data=conn.querySync("SELECT PROCEDURE, ABOUT, STATE, IN_NETWORK_COST, OUT_OF_NETWORK_COST, MEDICAL_CODE from HEALTHDEMO.PROCEDURE where upper(procedure) like upper(?)", [procedure]);
    conn.closeSync();
    return {result : "Results:", data : data, procedure:procedure};
   // return {result : data procedure , in_network_cost, out_of_network_cost };
 } catch (e) {
     //return { dberror : e }
     return{result : "No Results Found", data:data, state:state, code:code, e:e}
 }
}

function queryZipcode(dsn, zip) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    /** SELECT "ZIP", "CITY", "COUNTY", "STATE" FROM "HEALTHDEMO"."ZIPCODES";*/
    var data=conn.querySync("SELECT ZIP, CITY, COUNTY, STATE from HEALTHDEMO.ZIPCODES where ZIP=?",[zip]);
    conn.closeSync();
    return {result : "Results:", data : data, state:state, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, zip:zip, e:e}
 }
}

function queryByOrder(dsn, order_number) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    //var data=conn.querySync("SELECT ORDER_NO, EXTERNAL_ID, ORDER_DATE, SHIP_TO_NAME, SHIP_TO_ADDRESS_1, SHIP_TO_ADDRESS_2, SHIP_TO_ADDRESS_3, SHIP_TO_CITY, SHIP_TO_STATE, SHIP_TO_ZIP, SHIP_TO_COUNTRY, SHIP_TO_EMAIL, SHIP_TO_PHONE, SHIP_TO_IS_COMMERCIAL, SHIP_TO_COMPANY_NAME, FORCE_SHIP_TO_ADDRESS, FORCE_DUPLICATE, BILL_TO_NAME, BILL_TO_ADDRESS_1, BILL_TO_ADDRESS_2, BILL_TO_ADDRESS_3, BILL_TO_CITY, BILL_TO_STATE, BILL_TO_ZIP, BILL_TO_COUNTRY, BILL_TO_EMAIL, BILL_TO_PHONE, BILL_TO_COMPANY_NAME, SKU, RETAILER_SKU, UPC, RETAILER_LINE_NO, QUANTITY, SHIPPING_METHOD, PACKING_LIST_MESSAGE_1, SHIPPING_WINDOW_TYPE, SHIPPING_WINDOW_MIN_DATE, SHIPPING_WINDOW_MAX_DATE, DELIVERY_WINDOW_TYPE, DELIVERY_WINDOW_MIN_DATE, DELIVERY_WINDOW_MAX_DATE, HEADER_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1 from WWDEMO.ORDERS where _order_no_ = ?,[order_number]);
    var data=conn.querySync("SELECT ORDER_DATE, EXTERNAL_ID, ORDER_DATE, SHIP_TO_NAME, SHIP_TO_ADDRESS_1, SHIP_TO_CITY, DELIVERY_WINDOW_MAX_DATE from WWDEMO.ORDERS where order_no =?",[order_number]);
    conn.closeSync();
    var resString="_\nThe ship to address is:" + data[0]['SHIP_TO_ADDRESS_1']+","+data[0]['SHIP_TO_CITY']+ "_\nShip To Name: "+data[0]['SHIP_TO_NAME'];
    var fullString="_\nOrder Date:" + data[0]['ORDER_DATE']+"_\nExternal ID:" +data[0]['EXTERNAL_ID']+ "_\nShip To Name: "+data[0]['SHIP_TO_NAME']+ "_\nShip To Address: "+data[0]['SHIP_TO_ADDRESS_1']+ "_\nShip To City: "+data[0]['SHIP_TO_CITY']+ "_\nDelivery Window Max Date: "+data[0]['DELIVERY_WINDOW_MAX_DATE'];
    return {result : "Order Results:", resString, fullString, data:data, order_number:order_number, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, order_number:order_number, e:e}
 }
}

function queryByOrderStatusFSD(dsn, order_number) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    //var data=conn.querySync("SELECT ORDER_NO, EXTERNAL_ID, ORDER_DATE, SHIP_TO_NAME, SHIP_TO_ADDRESS_1, SHIP_TO_ADDRESS_2, SHIP_TO_ADDRESS_3, SHIP_TO_CITY, SHIP_TO_STATE, SHIP_TO_ZIP, SHIP_TO_COUNTRY, SHIP_TO_EMAIL, SHIP_TO_PHONE, SHIP_TO_IS_COMMERCIAL, SHIP_TO_COMPANY_NAME, FORCE_SHIP_TO_ADDRESS, FORCE_DUPLICATE, BILL_TO_NAME, BILL_TO_ADDRESS_1, BILL_TO_ADDRESS_2, BILL_TO_ADDRESS_3, BILL_TO_CITY, BILL_TO_STATE, BILL_TO_ZIP, BILL_TO_COUNTRY, BILL_TO_EMAIL, BILL_TO_PHONE, BILL_TO_COMPANY_NAME, SKU, RETAILER_SKU, UPC, RETAILER_LINE_NO, QUANTITY, SHIPPING_METHOD, PACKING_LIST_MESSAGE_1, SHIPPING_WINDOW_TYPE, SHIPPING_WINDOW_MIN_DATE, SHIPPING_WINDOW_MAX_DATE, DELIVERY_WINDOW_TYPE, DELIVERY_WINDOW_MIN_DATE, DELIVERY_WINDOW_MAX_DATE, HEADER_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1 from WWDEMO.ORDERS where _order_no_ = ?,[order_number]);
    var data=conn.querySync("SELECT ORDER_STATUS, REP_ID from FSD.ORDER_DETAILS where ORDER_NUM =?",[order_number]);
    conn.closeSync();
    var resString="_\nThe Order Status is:" + data[0]['ORDER_STATUS'];
    var fullString="_\nYour Rep ID is :" + data[0]['REP_ID'];
    return {result : "Order Results:", resString, fullString, data:data, order_number:order_number, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, order_number:order_number, e:e}
 }
}

function queryByOrderRtrnFSD(dsn, order_number,item) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    //var data=conn.querySync("SELECT ORDER_NO, EXTERNAL_ID, ORDER_DATE, SHIP_TO_NAME, SHIP_TO_ADDRESS_1, SHIP_TO_ADDRESS_2, SHIP_TO_ADDRESS_3, SHIP_TO_CITY, SHIP_TO_STATE, SHIP_TO_ZIP, SHIP_TO_COUNTRY, SHIP_TO_EMAIL, SHIP_TO_PHONE, SHIP_TO_IS_COMMERCIAL, SHIP_TO_COMPANY_NAME, FORCE_SHIP_TO_ADDRESS, FORCE_DUPLICATE, BILL_TO_NAME, BILL_TO_ADDRESS_1, BILL_TO_ADDRESS_2, BILL_TO_ADDRESS_3, BILL_TO_CITY, BILL_TO_STATE, BILL_TO_ZIP, BILL_TO_COUNTRY, BILL_TO_EMAIL, BILL_TO_PHONE, BILL_TO_COMPANY_NAME, SKU, RETAILER_SKU, UPC, RETAILER_LINE_NO, QUANTITY, SHIPPING_METHOD, PACKING_LIST_MESSAGE_1, SHIPPING_WINDOW_TYPE, SHIPPING_WINDOW_MIN_DATE, SHIPPING_WINDOW_MAX_DATE, DELIVERY_WINDOW_TYPE, DELIVERY_WINDOW_MIN_DATE, DELIVERY_WINDOW_MAX_DATE, HEADER_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1 from WWDEMO.ORDERS where _order_no_ = ?,[order_number]);
    var data=conn.querySync("SELECT ITEM_DETAIL, QTY, DIST_CENTER from FSD.ORDER_DETAILS where (ORDER_NUM =? AND ITEM_DETAIL=?)",[order_number,item]);
    conn.closeSync();
    var resString="_\nThis order had a quantity of  :" + data[0]['QTY']+ "_\nitem decription: "+data[0]['ITEM_DETAIL'];
    var fullString="_\nA return tag for distribution center :" + data[0]['DIST_CENTER']+ " _\nwill be emailed to you";
    return {result : "Order Results:", resString, fullString, data:data, order_number:order_number, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, order_number:order_number, e:e}
 }
}

function queryByOrderModFSD(dsn, order_number,item) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    //var data=conn.querySync("SELECT ORDER_NO, EXTERNAL_ID, ORDER_DATE, SHIP_TO_NAME, SHIP_TO_ADDRESS_1, SHIP_TO_ADDRESS_2, SHIP_TO_ADDRESS_3, SHIP_TO_CITY, SHIP_TO_STATE, SHIP_TO_ZIP, SHIP_TO_COUNTRY, SHIP_TO_EMAIL, SHIP_TO_PHONE, SHIP_TO_IS_COMMERCIAL, SHIP_TO_COMPANY_NAME, FORCE_SHIP_TO_ADDRESS, FORCE_DUPLICATE, BILL_TO_NAME, BILL_TO_ADDRESS_1, BILL_TO_ADDRESS_2, BILL_TO_ADDRESS_3, BILL_TO_CITY, BILL_TO_STATE, BILL_TO_ZIP, BILL_TO_COUNTRY, BILL_TO_EMAIL, BILL_TO_PHONE, BILL_TO_COMPANY_NAME, SKU, RETAILER_SKU, UPC, RETAILER_LINE_NO, QUANTITY, SHIPPING_METHOD, PACKING_LIST_MESSAGE_1, SHIPPING_WINDOW_TYPE, SHIPPING_WINDOW_MIN_DATE, SHIPPING_WINDOW_MAX_DATE, DELIVERY_WINDOW_TYPE, DELIVERY_WINDOW_MIN_DATE, DELIVERY_WINDOW_MAX_DATE, HEADER_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, HEADER_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_NAME_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_VALUE_1, LINE_LEVEL_EXTENDED_ATTRIBUTE_TYPE_1 from WWDEMO.ORDERS where _order_no_ = ?,[order_number]);
    var data=conn.querySync("SELECT ORDER_NUM, ACCOUNT_NUM, REP_ID, ITEM_NUM, ITEM_DETAIL, QTY, PROVIDER_ID, DIST_CENTER, ORDER_STATUS from FSD.ORDER_DETAILS where (ORDER_NUM =? AND ITEM_DETAIL=?)",[order_number,item]);
    conn.closeSync();
    var resString="Order for _:" + data[0]['ORDER_NUM'] + "_\n";
    for (var i=0;i<data.length;i++) {
      resString+="Order Item #:"+i+"\nITEM_NUM:" + data[i]['ITEM_NUM']+ "\nITEM_DETAIL: "+data[i]['ITEM_DETAIL']+"\nQTY: "+data[i]['QTY']+"\n\n";
    }
    return {result : "Order Results:", resString, data:data, order_number:order_number, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, order_number:order_number, e:e}
 }
}
//CUSOTMER QUERY
function queryByCustomer(dsn, cust_name) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    
    var data=conn.querySync("SELECT CUSTOMER_NAME,IBM_CUST__NUMBER,SITE_ID FROM INTERNDEMO.ENTITLEMENTS where (CUSTOMER_NAME =?)",[cust_name]);
    conn.closeSync();
    var resString="Customer Name _:" + data[0]['CUSTOMER_NAME'] + "_\n";
    for (var i=0;i<data.length;i++) {
      resString+="Customer Name #:"+i+"\nCUSTOMER_NAME:" + data[i]['CUSTOMER_NAME']+"\nCustomer Number: "+data[i]['IBM_CUST__NUMBER']+"\nSite ID: "+data[i]['SITE_ID']+"\n\n";
    }
    return {result : "Customer Information:", resString, data:data, cust_name:cust_name, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, cust_name:cust_name, e:e}
 }
}

//ENTITLEMENT QUERY
function queryBySiteID(dsn, cust_num) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    
    var data=conn.querySync("SELECT IBM_CUST__NUMBER, PID_NAME , SUBSCRIPTION_NAME , LICENSE_QTY, ACTIVE_S_S_QTY, S_S_STATUS, ACTIVE_S_S_END_DATE, END_YEAR, END_QTR FROM INTERNDEMO.ENTITLEMENTS WHERE (IBM_CUST__NUMBER =? AND S_S_STATUS ='ACTV')",[cust_num]);
    conn.closeSync();
    var resString="Results for Customer #:"+ data[0]['IBM_CUST__NUMBER'] +" Click Here to see FastPASS: <https://fastpass.w3cloud.ibm.com/sales/fastpass/search/EntitlementSearchServlet?cust_name=&ibmcustomernum=" + data[0]['IBM_CUST__NUMBER'] + "&postal_code=&contractnum=&customernum=&programselection=PA&programselection=PX&ibm-submit=Search> \n" + "List of Entitlements Below: \n";
    for (var i=0;i<data.length;i++) {
      resString+="PID Name: "+data[i]['PID_NAME']+"\nSubscription Name: "+data[i]['SUBSCRIPTION_NAME']+"\nEnd Year: "+data[i]['END_YEAR']+"  End Qtr: "+data[i]['END_QTR']+"\n\n";
    }
    return {result : "Customer Entitlement Information:", resString, data:data, cust_num:cust_num, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, cust_num:cust_num, e:e}
 }
}

//OPEN CASES QUERY
function queryOpenCases(dsn, cust_num) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    
    var data=conn.querySync("SELECT CUSTOMER_NAME , IBM_PRODUCT_NAME, PRODUCT_VERSION, CASE_NUMBER, CONTACT_NAME__FULL_NAME, CONTACT_EMAIL, CONTACT_PHONE_NUMBER, DATETIMEOPENED, DAYSOPEN, SEVERITY_LEVEL FROM INTERNDEMO.SUPPORT_CASES WHERE (IBM_CUST__NUMBER =? AND STATUS NOT LIKE '%Closed%' AND STATUS NOT LIKE '%Cancelled%')",[cust_num]);
    conn.closeSync();
    var resString="Results for Customer Name:"+ data[0]['CUSTOMER_NAME'] + "\n";
    for (var i=0;i<data.length;i++) {
      resString+="Severity:"+data[i]['SEVERITY_LEVEL']+"\n Product Name: "+data[i]['IBM_PRODUCT_NAME']+"\n Product Version: "+data[i]['PRODUCT_VERSION']+"\n Case Number: <https://w3.ibm.com/tools/caseviewer/case/"+data[i]['CASE_NUMBER']+"> \n Contact Name: "+data[i]['CONTACT_NAME__FULL_NAME']+"\n Contact Email: "+data[i]['CONTACT_EMAIL']+ "\n";
    }
    return {result : "Customer Open Case Information:", resString, data:data, cust_num:cust_num, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, cust_num:cust_num, e:e}
 }
}
//Steven Cook QUERY
function queryCook(dsn, cust_name) { 
 try {    
    var conn=ibmdb.openSync(dsn);
    
    var data=conn.querySync("SELECT ACCOUNT_NAME, GBG_NAME, TECH_CLIENT_OR_WHITE_SPACE, BRANCH_NAME, SUB_INDUSTRY, INDUSTRY, SECURITY_QUADRANT, SECURITY_SERVICES, ADVANCED_FRAUD_PROTECTION_PORTFOLIO, APPLICATION_SECURITY_PORTFOLIO, DATA_SECURITY_PORTFOLIO, IDENTITY_AND_ACCESS_MANAGEMENT_PORTFOLIO, MOBILE_SECURITY_AND_MANAGEMENT_PORTFOLIO, SECURITY_THREAT_MANAGEMENT_INFRASTRUCTURE_PORTFOLIO, SECURITY_THREAT_MANAGEMENT_PORTFOLIO, CITY, STATE, SECURITY_2022, SECURITY_2021,Z_INSTALL, DB2,ACCESS_MANAGEMENT, CLOUD_PAK_FOR_SECURITY, DISCOVER_AND_CLASSIFY, GUARDIUM_DATA_ENCRYPTION, GUARDIUM_DATA_PROTECTION, GUARDIUM_INSIGHTS, GUARDIUM_KEY_LIFECYCLE_MANAGEMENT, I2_INTELLIGENCE_ANALYSIS, IDENTITY_GOVERNANCE_AND_ADMINISTRATION, MAAS360, PRIVILEGED_ACCESS_MANAGEMENT, QRADAR_ON_CLOUD, QRADAR_SIEM, REAQTA, SECURITY_NETWORK_PROTECTION, SECURITY_ORCHESTRATION_AND_RESPONSE, SECURITY_VERIFY_ON_CLOUD, TRUSTEER_FRAUD_PROTECTION, WATSON_FOR_CYBERSECURITY, XFORCE_THREAT_INTELLIGENCE, ZSYSTEMS_SECURITY, AMAZON_WEB_SERVICES_INSTALL , GOOGLE_CLOUD_INSTALL, MICROSOFT_AZURE_INSTALL FROM INTERNDEMO.COOK WHERE (ACCOUNT_NAME =?)",[cust_name]);
    conn.closeSync();
    var resString="Results for Customer Name:"+ data[0]['ACCOUNT_NAME'] + "\n";
    for (var i=0;i<data.length;i++) {
      resString+="Tech or Whitespace:"+data[i]['TECH_CLIENT_OR_WHITE_SPACE']+"\n Branch Name: "+data[i]['BRANCH_NAME']+"\n Sub Industry: "+data[i]['SUB_INDUSTRY']+"\n Industry: "+data[i]['INDUSTRY']+"> \n Security Quadrant: "+data[i]['SECURITY_QUADRANT']+"\n Security Services: "+data[i]['SECURITY_SERVICES']+"\n Advanced Fraud Prot Port: "+data[i]['ADVANCED_FRAUD_PROTECTION_PORTFOLIO']+ "\n";
    }
    return {result : "Customer Details:", resString, data:data, cust_name:cust_name, e:0};
 } catch (e) {
     return {result : "No Results Found", data:data, ccust_name:cust_name, e:e}
 }
}
/**
  * Bind query parameter and dashDB (Db2 Warehouse on Cloud) credentials
  *
  */
function main(params) {
  dsn=params.__bx_creds[Object.keys(params.__bx_creds)[0]].dsn;
  
  // dsn does not exist in the DB2 credential for Standard instance. It must be built manually
  if(!dsn) {
    const dbname = params.__bx_creds[Object.keys(params.__bx_creds)[0]].connection.db2.database;
    const hostname = params.__bx_creds[Object.keys(params.__bx_creds)[0]].connection.db2.hosts[0].hostname;
    const port = params.__bx_creds[Object.keys(params.__bx_creds)[0]].connection.db2.hosts[0].port;
    const protocol = 'TCPIP';
    const uid = params.__bx_creds[Object.keys(params.__bx_creds)[0]].connection.db2.authentication.username;
    const password = params.__bx_creds[Object.keys(params.__bx_creds)[0]].connection.db2.authentication.password;
    
    //dsn="DATABASE=;HOSTNAME=;PORT=;PROTOCOL=;UID=;PWD=;Security=SSL";
    dsn = `DATABASE=${dbname};HOSTNAME=${hostname};PORT=${port};PROTOCOL=${protocol};UID=${uid};PWD=${password};Security=SSL`;

  }
  
  // switch between search types
  switch(params.actionname) {
        case "queryZipcode":
            return queryZipcode(dsn,params.zip);
        case "queryProcedure":
            return queryProcedure(dsn,params.state,params.code);
        case "queryCodeByProcedure":
            return queryCodeByProcedure(dsn,params.procedure);
        case "queryByOrder":
            return queryByOrder(dsn,params.order_number);
        case "queryByOrderStatusFSD":
            return queryByOrderStatusFSD(dsn,params.order_number);
        case "queryByOrderRtrnFSD":
            return queryByOrderRtrnFSD(dsn,params.order_number,params.item);
        case "queryByOrderModFSD":
            return queryByOrderModFSD(dsn,params.order_number,params.item);
        case "queryByCustomer":
            return queryByCustomer(dsn,params.cust_name);
        case "queryBySiteID":
            return queryBySiteID(dsn,params.cust_num);
        case "queryOpenCases":
            return queryOpenCases(dsn,params.cust_num);
        case "queryCook":
            return queryCook(dsn,params.cust_name);
        default:
            return { dberror: "Lookup action not defined", actionname: params.actionname}
    }
}