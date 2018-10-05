var os = require( 'os' );
var fs = require( 'fs' );
const path = require('path')

var oci = require( './oci' );

const homedir = require('os').homedir();
const OCI_PATH = path.join(homedir, ".oci")

console.log(OCI_PATH)

const ociDirExists = fs.existsSync(OCI_PATH)

if (!ociDirExists) {
  console.log("No OCI Dir, aborting")
  process.exit(1)
}


const authFile = fs.readFileSync(OCI_PATH + "/config").toString()

console.log("got authfile: \n", authFile)

var auth = {
  user: "",
  fingerprint: "",
  key_file: "",
  tenancy: "",
  region: "",
  compartmentId: ""
}

let authKeys = Object.keys(auth)

function matchKey(keys, string){
  
}

let authLines = authFile.split("\n")
// assign values to keys from file 
for(let rowindex=0; rowindex < authLines.length; rowindex++) {
  let row = authLines[rowindex]
  console.log("row", row)
  if(!row){
    continue
  }

  try {
  let thisKey = authKeys.reduce(key => {
    if (row.startsWith(key)) {
      return key
    }
    return ""
  })
  thisKey = thisKey.toString().replace(",","")
  console.log("key ")
  console.log(thisKey)
  let pattern = `${thisKey}=(.*)`
  console.log("Pattern " + pattern)
  auth[thisKey] = row.match(pattern)[1]
  console.log(auth[thisKey])

  } catch (ex) {
    console.log("pattern matching failed for row " + row)
    console.error(ex)
  }

}

console.log(auth)


auth.privateKey = fs.readFileSync(auth.key_file, 'ascii');

//var compartmentId = 'ocid1.tenancy.oc1..aaaaaaaa72nxc2if3h676gok2mo34fzstut6iztkdruls7hqwxdj6pysmmhq';
//var AWDOCID = 'ocid1.autonomousdwdatabase.oc1.iad.abuwcljtbqogthz3o4zffd7tcddcfgl4edoi5ro2chquqk7ufslbgiwsywjq';

//oci.database.autonomousDatabase.list( auth, { compartmentId : compartmentId}, function(data){console.log(data[0].dbName);});
//oci.database.autonomousDataWarehouse.list( auth, { compartmentId: compartmentId }, function(data){console.log(data[0].dbName);});

var ATPOCID = 'ocid1.autonomousdatabase.oc1.iad.abuwcljskistzoklbyg2wkmparvlfblisrdc6sjhcltqcqvfs777o4uutjcq';
var tags = { "freeformTags" : {"chris": 123456, "xxx": "yyy", "zzz": "aaa" }};
var parameters = {
    body : tags,
    autonomousDatabaseId : ATPOCID
}
//oci.database.autonomousDatabase.update( auth, parameters, function(data){console.log(data);} );
//oci.database.autonomousDatabaseBackup.list( auth, {"compartmentId": compOCID }, function(data){console.log(data);} );
//oci.objectStore.bucket.list(auth, 'oraclecloud431', {compartmentId: compOCID }, function(data){console.log(data);} );
//oci.objectStore.bucket.get(auth, 'oraclecloud431', 'calvin_bucket', function(data){console.log(data);} );

//oci.objectStore.namespace.getMetadata( auth, 'oraclecloud431', function(data){console.log(data);} )

//oci.objectStore.obj.list( auth, { namespaceName: 'oraclecloud431', bucketName: 'calvin_bucket'}, function(data){console.log(data);})

compOCID = 'ocid1.tenancy.oc1..aaaaaaaa72nxc2if3h676gok2mo34fzstut6iztkdruls7hqwxdj6pysmmhq';
//oci.database.autonomousDatabase.list( auth, { compartmentId: compOCID}, function(data){console.log(data);} );

parameters = {
  namespaceName: 'oraclecloud431',
  bucketName: 'calvin_bucket',
  body : { sourceName: 'part1.csv', newName: "part1_new.csv" }
};

//oci.objectStore.obj.rename( auth, parameters, function(data){console.log(data);} );

parameters = {
    compartmentId : 'ocid1.tenancy.oc1..aaaaaaaahm47pxqwunxjqel6jhiuyodldss4z2tx4m24cfmyqys3zndfw3ta',
    availabilityDomain: 'KgCo:US-ASHBURN-AD-1',
    //compartmentId : 'ocid1.compartment.oc1..aaaaaaaablk3uqbct3uvkzz4stugovjelbt4mkmt3oth2e6ebcxwub6jmtzq',
    vncId: 'ocid1.vcn.oc1.iad.aaaaaaaanoct32jijolnwc7vzwwgnwvsdtwdqjwlgzvlfx4o6as2v4unam7q',
    namespaceName : 'oraclecloud431'
}
/*
var query = '';
var queryParameterExists = false;
if( 'objectNamePrefix' in parameters ){
  query = query + ( queryParameterExists ? '&' : '?' ) +
          'objectNamePrefix=' + encodeURIComponent(parameters.objectNamePrefix);
  queryParameterExists = true;
}
if( 'limit' in parameters ){
  query = query + ( queryParameterExists ? '&' : '?' ) +
          'limit=' + encodeURIComponent(parameters.limit);
  queryParameterExists = true;
}
if( 'page' in parameters ){
  query = query + ( queryParameterExists ? '&' : '?' ) +
          'page=' + encodeURIComponent(parameters.page);
  queryParameterExists = true;
}

console.log( query );
*/

//oci.objectStore.bucket.list( auth, parameters, function(data){console.log(data);} );
//oci.iam.availabilityDomain.list( auth, parameters, function(data){console.log(data);} );
//oci.core.shape.list( auth, parameters, function(data){console.log(data);} );
//oci.core.subnet.list( auth, parameters, function(data){console.log(data);} );
//oci.core.vcn.list( auth, parameters, function(data){console.log(data);} );
oci.database.autonomousDatabase.list( auth, parameters, function(data){console.log(data);} );
//oci.iam.user.list( auth, parameters, function(data){console.log(data);} );

auth.RESTversion = '/20171215';
oci.fileStorage.fileSystemSummary.list( auth, parameters, function(data){console.log(data);} );
