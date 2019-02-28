# Managing multiple SSH keys

The previous answers have properly explained the way to create a configuration file to manage multiple ssh keys. I think, the important thing that also needs to be explained is the replacement of a host name with an alias name while cloning the repository.

Suppose, your company's GitHub account's username is abc1234. And suppose your personal GitHub account's username is jack1234

And, suppose you have created two RSA keys, namely id_rsa_company and id_rsa_personal. So, your configuration file will look like below:

```bash
# Company account
Host company
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_company

# Personal account
Host personal
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_personal
```

Now, when you are cloning the repository (named demo) from the company's GitHub account, the repository URL will be something like:

```bash
Repo URL: git@github.com:abc1234/demo.git
```

Now, while doing git clone, you should modify the above repository URL as:

```base
git@company:abc1234/demo.git
```

Notice how github.com is now replaced with the alias "company" as we have defined in the configuration file.

Similary, you have to modify the clone URL of the repository in the personal account depending upon the alias provided in the configuration file.

Answer by Peter Mortensen, Please upvote!

Source: https://stackoverflow.com/questions/2419566/best-way-to-use-multiple-ssh-private-keys-on-one-client