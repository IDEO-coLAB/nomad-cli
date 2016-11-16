# nomad-cli

> Push nomad nodes to the cloud and announce nomad nodes to adlib.

## Installation
```console
> npm install -g https://github.com/IDEO-coLAB/nomad-cli.git
```

## Use
### Push a node you've written to the cloud:

```console
> cd /YOUR_SENSOR_CODE
> nom push
```
```/YOUR_SENSOR_CODE``` is the root directory of your code. It needs to contain a ```package.json``` file with a ```name``` property and a ```description``` property. The entry point for your code needs to be ```sensor.js```.

The command will send both your code and the IPFS ```repo``` directory (which includes the node's identity and private key) to the cloud. The command will send the IPFS ```repo``` found in the ```IPFS_PATH``` environment variable or if it's not set will default to ```~/.ipfs```.

Gotcha: npm complains when a ```package.json``` ```name``` property contains spaces so name your node ```something-like-this```.

### Announce a node you've written to adlib:

```console
> cd /YOUR_SENSOR_CODE
> nom annnounce
```

As with ```nom push```, ```/YOUR_SENSOR_CODE``` is the root directory of your code. It needs to contain a ```package.json``` file with a ```name``` property and a ```description``` property. The command will send both your code and the IPFS ```repo``` directory (which includes the node's identity and private key) to the cloud. The command will send the IPFS ```repo``` found in the ```IPFS_PATH``` environment variable or if it's not set will default to ```~/.ipfs```.

You can ```nom announce``` a node if it's running in the cloud or if it's running locally (for example on your laptop, or on a raspberry pi).

### Everything else you might want to do

Slack the #nomad-help [channel](https://ideocolabs.slack.com/messages/nomad-help/)