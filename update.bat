set app=C:\Projects\minerva

xcopy "core\*.css" "%app%\css\" /s/d/y
xcopy "core\*.js" "%app%\js\" /s/d/y
xcopy "css\*.*" "%app%\css\" /s/d/y
xcopy "img\*.*" "%app%\img\" /s/d/y
xcopy "libs\*.css" "%app%\css\" /s/d/y
xcopy "libs\*.js" "%app%\js\" /s/d/y
xcopy "plugins\*.css" "%app%\css\" /s/d/y
xcopy "plugins\*.js" "%app%\js\" /s/d/y
xcopy "widgets\*.css" "%app%\css\" /s/d/y
xcopy "widgets\*.js" "%app%\js\" /s/d/y
xcopy "wiki\*.css" "%app%\css\" /s/d/y
xcopy "wiki\*.js" "%app%\js\" /s/d/y
xcopy "wiki\*.html" "%app%\tpl\" /s/d/y
xcopy "qorpent.start.html" "%app%\" /s/d/y