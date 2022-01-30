### Requirements
* Gatsby

### Install Gatsby
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 14
nvm use 14
npm install -g gatsby-cli
```
* https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
* https://www.gatsbyjs.org/tutorial/part-zero/

### Set up
```
git clone https://github.com/politylink/politylink-gatsby.git
cd politylink-gatsby
npm install
``` 

### Run
```
gatsby develop -H 0.0.0.0
```

```
gatsby build
gatsby serve -H 0.0.0.0
```
