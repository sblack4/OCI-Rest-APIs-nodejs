# OCI-Rest-APIs-nodejs

Oracle Cloud Infrastructure REST APIs implemented in node.js, with current support for Database and limited Object Storage.  More will be added.

 Most commands take the form of:

## oci.[serviceName].[resourceType].[action]

For example, to list autonomous datawarehouses:

### oci.databases.autonomousDataWarehouses.list( auth, parameters, callback );
Inputs take the following form...

**auth**: JSON object 
```javascript
  auth={
    tenancyId : "xxx.aaa.bbb",
    userId : "user.123.456",
    keyFingerprint : "a2:f4:45:ca:98"
    RESTversion : '/20160918',
    region : 'us-ashburn-1',
    privateKey : // the text of the PEM key, not the name of the file
  };
```

**parameters**:
  JSON object cantaining any of the parameters for the REST call.  For a descrioption of the parameters see here:  https://docs.cloud.oracle.com/iaas/api/#/

  eg.  a parameter object to change the freeForm tags of autonomousDatabase might look like
```javascript
  var parameters = {
    autonomousDatabaseId : "asd.jsj.0239409324",
    body : { "freeformTags" : {"tag 1": 123456, 
                               "tag 2": "yyy", 
                               "tag 3": "aaa" },
    };
```
and the call to make the change would be

```javascript
oci.databases.autonomousDatabase.update( auth,
                                         parameters,
                                         function(data){
                                             console.log(data);
                                         } );
```
**callback**: Node.js standard callback function.


See the main.js for other examples of how to setup the auth an how to call the API.


## Sample Scripts! 
Here's the script name and the arguments: 
```
createAutonomousDatabase DBNAME DISPLAYNAME PASSWORD CPUCOUNT STORAGEINTBS
deleteAutonomousDatabase DBOCID
getAutonomousDatabase DBOCID
listAutonomousDatabases - no arguments
startAutonomousDatabase DBOCID
stopAutonomousDatabase DBOCID
backupAutonomousDatabase – is not included
restoreAutonomousDatabase DBOCID time
updateAutonomousDatabase CPUCount StorageInTBs DBOCID
```



