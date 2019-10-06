let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd /Users/Shared/Dev/MyProjects/SuryoLingoMob
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +2 ~/.vimrc
badd +3 rn-patches/react-native-keyboard-input/react-native-keyboard-input.podspec
badd +26 ios/Podfile
badd +12 node_modules/react-native-keyboard-input/react-native-keyboard-input.podspec
badd +1 package.json
badd +10 scripts/rn-patching.sh
badd +301 ios/Pods/Manifest.lock
badd +1 node_modules/react-native-keyboard-tracking-view/react-native-keyboard-tracking-view.podspec
badd +3 rn-patches/react-native-keyboard-tracking-view/react-native-keyboard-tracking-view.podspec
badd +3 node_modules/react-native-fetch-blob/package.json
badd +13 node_modules/react-native-fetch-blob/react-native-fetch-blob.podspec
badd +10 src/scenes/Courses/index.tsx
argglobal
%argdel
edit ios/Podfile
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 31 + 69) / 138)
exe 'vert 2resize ' . ((&columns * 106 + 69) / 138)
argglobal
enew
file NERD_tree_1
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 43 - ((13 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
43
normal! 034|
wincmd w
exe 'vert 1resize ' . ((&columns * 31 + 69) / 138)
exe 'vert 2resize ' . ((&columns * 106 + 69) / 138)
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOF
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
