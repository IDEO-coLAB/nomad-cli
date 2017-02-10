# nomad-cli

> Push nomad nodes to the cloud and announce nomad nodes to adlib.

## Installation
```console
> npm install -g https://github.com/IDEO-coLAB/nomad-cli.git
```

## Use
### Announce a node you've written to adlib:

```console
> cd /YOUR_SENSOR_CODE
> nom annnounce
```

```/YOUR_SENSOR_CODE``` is the root directory of your code. It needs to contain a ```package.json``` file with a ```nomadName``` property and a ```description``` property. The command will announce your node to adlib so that anyone in the community can see that its live and see its data. You'll need to make sure the ```IPFS_PATH``` environment variable is set to the location of your IPFS repo. The announce command uses this directory to figure out the public key identity of your node.
