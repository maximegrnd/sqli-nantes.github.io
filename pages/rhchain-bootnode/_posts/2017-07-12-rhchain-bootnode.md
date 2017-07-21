# Bootnode for RHChain

## Install 

1. Download Bootnode tool

```bash

apt-get install -y --no-install-recommends software-properties-common
add-apt-repository -y ppa:ethereum/ethereum
apt-get update
apt-get install -y --no-install-recommends bootnode

```

2. Create binaries folder

```bash
mkdir bin
```

3. Copy bootnode to binaries folder

```bash
cp /usr/bin/bootnode ./bin
```

4. Generate bootnode private key (bootnode.priv)

```bash
./bin/bootnode -v5 -verbosity 9 -genkey "bootnode.priv"
```

5. Create bootnode public key file (bootnode.pub)

```bash
./bin/bootnode -v5 -nodekey boot.key -writeaddress > bootnode.pub
```

## Start

```bash
./start.sh
```


