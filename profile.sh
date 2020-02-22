# Aliases and Initial Scripts

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

echo 'Running initial scripts and adding aliases.'

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Custom Commands #

# aliases for alternate reference names
alias          n="node"
alias        pjs="profoundjs"

# aliases for compiling specific less files
alias      setlc="echo Compiling...; lessc ~/workspace/public/styles/set.less > ~/workspace/public/styles/set.css; echo Compiled.;" 
alias        slc="echo Compiling...; lessc ~/workspace/public/styles/styles.less > ~/workspace/public/styles/styles.css; echo Compiled.;"
alias        clc="echo Compiling...; lessc ~/workspace/public/styles/custom.less > ~/workspace/public/styles/custom.css; echo Compiled.;"
alias       cclc="echo Compiling...; lessc ~/workspace/public/styles/cocacola.less > ~/workspace/public/styles/cocacola.css; echo Compiled.;"
alias        lcb="slc; clc;"

# aliases for fixing endline characters of a file
alias       fixr="sed -i 's/\r$//'"
alias       fixi="sed -i 's/\r$//' ~/workspace/init.sh"

# alias for remove command with -r option
alias        rmr="rm -r"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for installing shell packages
alias     iunzip="sudo apt-get install unzip"
alias       izip="sudo apt-get install zip"
alias     ijszip="npm i jszip"
alias      iless="npm i less"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# variables for holding file paths
bashrc="~/.bashrc"
profile="~/.profile"
initsh="~/init.sh"

wbashrc="~/workspace/bashrc.sh"
wprofile="~/workspace/profile.sh"
winitsh="~/workspace/init.sh"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for copying bashrc, profile, and init.sh files, destination needs to be
# specified when using, i.e. cpbashrc ~/workspace/public/example.sh will copy content of
# ~/.bashrc to example.sh in the public folder.
alias   cpbashrc="cp ${bashrc}"
alias  cpprofile="cp ${profile}"
alias   cpinitsh="cp ${initsh}"

alias  cpwbashrc="cp ${wbashrc}"
alias cpwprofile="cp ${wprofile}"
alias  cpwinitsh="cp ${winitsh}"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for copying bashrc, profile, and init.sh files 
# specifically from ~/workspace to ~/
alias     upinit="cpwinitsh ${initsh}"
alias       upin="upinit"
alias       upib="cpwinitsh ${bashrc}"
alias       upip="cpwinitsh ${profile}"

alias   upbashrc="cpwbashrc ${bashrc}"
alias       upbr="upbashrc"
alias       upbi="cpwbashrc ${initsh}"
alias       upbp="cpwbashrc ${profile}"

alias  upprofile="cpwprofile ${profile}"
alias       uppf="upprofile"
alias       uppi="cpwprofile ${initsh}"
alias       uppb="cpwprofile ${bashrc}"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for copying bashrc, profile, and init.sh files 
# specifically from ~/ to ~/workspace
alias       cpin="cpinitsh ${winitsh}"
alias       cpib="cpinitsh ${wbashrc}"
alias       cpip="cpinitsh ${wprofile}"

alias       cpbr="cpbashrc ${wbashrc}"
alias       cpbi="cpbashrc ${winitsh}"
alias       cpbp="cpbashrc ${wprofile}"

alias       cppf="cpprofile ${wprofile}"
alias       cppi="cpprofile ${winitsh}"
alias       cppb="cpprofile ${wbashrc}"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for using multiple up/cp aliases at once
alias       upup="upbr;uppf;"
alias       cpcp="cpbr;cppf;"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for writing content of file to terminal
alias       cbrc="cat ${bashrc}"
alias       cprf="cat ${profile}"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for change directory commands
alias        cdh="cd ~/"
alias        cdw="cd ~/workspace"
alias        cdn="cd ~/workspace/node_modules"
alias        cdp="cd ~/workspace/public"
alias        cdc="cd ~/workspace/public/styles"
alias        cdi="cd ~/workspace/public/images"
alias        cdj="cd ~/workspace/public/scripts"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for updating node packages through node package manager (npm)
alias       npmu="npm update"
alias       pjsu="npm update profoundjs"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for fixing endline character of specified file
alias   fxbashrc="fixr ${bashrc}"
alias  fxprofile="fixr ${profile}"
alias   fxinitsh="fixr ${initsh}"

alias  fxwbashrc="fixr ${wbashrc}"
alias fxwprofile="fixr ${wprofile}"
alias  fxwinitsh="fixr ${winitsh}"

# aliases for executing specified file in context of terminal session
alias   exbashrc=". ${bashrc}"
alias  exprofile=". ${profile}"
alias   exinitsh=". ${initsh}"

alias  exwbashrc=". ${wbashrc}"
alias exwprofile=". ${wprofile}"
alias  exwinitsh=". ${winitsh}"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# aliases for adding bin path of package bin folder
alias    exbin='export PATH=$PATH:~/workspace/node_modules/.bin'
alias    extutor='export PATH=$PATH:~/workspace/node_tutorial/bin'
alias    exlessc='export PATH=$PATH:~/workspace/node_modules/less/bin'

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# commands to run when terminal starts
exlessc
cpcp

# kill Ctrl+S so to prevent "freezing" issue 
stty -ixon

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #