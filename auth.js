
const os = require( 'os' );
const fs = require( 'fs' );
const path = require('path')
const oci = require( './oci' );


class ConfigFile {
    constructor(configPath="~/.oci/config", profile="DEFAULT") {
        this.absPath = this.getAbsPath(configPath)
        this.auth = {
            user: "",
            fingerprint: "",
            key_file: "",
            tenancy: "",
            region: "",
            compartmentId: ""
        }
        this.privateKey = ""

        let configExists = fs.existsSync(this.absPath)
        if (configExists) {
            this.parseConfig()
        }

        let keyFP = this.getAbsPath(this.auth.key_file)
        let keyExists = fs.existsSync(keyFP)
        if (keyExists) {
            this.privateKey = fs.readFileSync(keyFP, 'ascii')
        }

    }
    getAbsPath(filePath) {
        return filePath.replace("~", os.homedir())
    }
    parseConfigLine(line) {
        let authKeys = Object.keys(this.auth)
        let thisKey = authKeys.find(key => line.startsWith(key))
        if (!thisKey) 
          return { key: "", match: ""}
        let pattern = `${thisKey}=(.*)`

        return { key: thisKey, match: line.match(pattern)[1]}
    }
    parseConfig() {
        let configExists = fs.existsSync(this.absPath)
        if (!configExists) {
            throw Error("OCI config file does not exist! at specified location: " + this.absPath)
        }

        let rawFile = fs.readFileSync(this.absPath).toString()
        let rawLines = rawFile.split("\n")
                        .filter(line => line)
        
        let parsedLines = rawLines.map(line => this.parseConfigLine(line))

        parsedLines.forEach(keyMatch => {
            if(keyMatch.key)
                this.auth[keyMatch.key] = keyMatch.match
        });

        return this
    }

}


let configFile = new ConfigFile()

console.log(configFile.auth)

console.log(configFile.privateKey)