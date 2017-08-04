# sqli-nantes.github.io

## Tutoriel

Le site a été conçu de manière à être responsive autant que possible, et ce, sur un maximum de supports (ordinateur, tablette et smartphone). Basé sur un template (HTML5 UP), il fonctionne avec la technologie Jekyll et a pour objectif d'être maintenable automatiquement en étant simple d'utilisation afin de faciliter l'ajout d'une ou plusieurs pages projet.

### Page home

Le fichier index.html présent à la racine du répertoire sqli-nantes.github.io constitue la page d'accueil de la plate-forme. Il permet d'afficher, au-delà du listing des iniatives Open Source en cours, les technologies utilisées avant d'entrer davantage dans les détails.

Un projet se voit lister dès lors qu'un repositories dédié à celui-ci est créé sur le GitHub (sqli-nantes). Dans cette même idée, un bouton de redirection apparaît à l'intérieur de chaque rubrique uniquement si une page de description précise pour un projet existe au sein de l'arborescence de fichiers (_pages/nom_du_projet/index.html).
La visibilité du projet ne dépend d'aucune intervention sur le fichier .html de la page home, il n'y a techniquement aucun apport à effectuer pour un utilisateur souhaitant exposer son ou ses codes.

### Page projet

Chaque projet mettant en avant le ou les programmes d'un utilisateur, devra faire l'objet de la création d'un sous-dossier à l'intérieur du dossier pages portant le nom de projet (ex: go-ethereum) dans lequel se trouveront deux autres sous-dossiers : _posts et js.
A la racine du dossier projet devra être placé un fichier index.html, différent de la home, qui sera la page web dédiée au projet et dans les deux autres le README.md du ou des programmes ainsi que le data_nom_du_projet.js pour le second.

Récapitulatif des manoeuvres à effectuer :
1. Créer une copie du sous-dossier modele dans le dossier pages et lui attribuer le nom de votre projet
2. Ouvrir le sous-dossier js de la copie et renommer le fichier JavaScript présent sous la forme data_nom_du_projet.js
3. Ouvrir ce même fichier et modifier les liens de l'API GitHub afin de les faire coïncider avec votre projet
4. Placer le README.md de votre programme et le renommer sous la forme suivante : AAAA-MM-JJ-nom_du_programme.md
5. Ouvrir l'index.html présent, rectifier l'intérieur des balises (meta title, h1) et modifier le chemin qui associe le fichier data_[...].js en conséquence (ligne 69)
6. Dans ce même fichier, changer la macro présente par (ligne 48) :

`{% for post in site.posts %} {% if post.path contains "/AAAA-MM-JJ-nom_du_programme.md" %} <div class="content"> {{ post.content }} </div> {% endif %} {% endfor %}`

7. Dernière étape, corriger si besoin le chemin du logo projet correspondant au langage de développement dominant de votre programme (ligne 25). Si votre projet possède son propre symbole, indiquez alors ce dernier.
