// aici urmeaza sa scriu middleware-ul care verifica daca utilizatorul
// are dreptul sa acceseze o resursa anume, de exemplu daca un utilizator
// incearca sa modifice un job postat de alt angajator ar trebui sa fie
// blocat si sa primeasca un mesaj de eroare. sau daca vrea sa obtina datele altui candidat.

const checkOwnership = async (req, res, next) => {
    // Pentru moment, permitem accesul pentru actualizarea propriului profil
    // Utilizatorul actualizează propriul profil (req.user.id este setat de middleware-ul authenticate)
    next();
};

module.exports = checkOwnership;