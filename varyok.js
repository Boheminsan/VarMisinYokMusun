   var ogeler = document.createDocumentFragment();
    var secilen;
    var selected = 0;
    var acilan = [];
    //24 para ödülü
    var kucuk = [1, 2, 5, 10, 25, 50, 100, 200, 300, 400, 500, 750];
    var orta = [10000, 20000, 30000, 40000, 50000];
    var buyuk = [100000, 150000, 200000, 250000, 500000, 500000, 500000];
    var paralar = kucuk.concat(orta).concat(buyuk);
    var paralar2 = kucuk.concat(orta).concat(buyuk);
    var kutuSayisi = 0;
    var teklifGeldi = [5, 4, 4, 3, 2, 2, 1, 1, 1];
    var asama = 0;
    console.log('aşama ' + asama);

    //24 kutucuk
    olustur('button', 24, 'kutu', 'ortaalan', 'onclick', 'button');
    var kutular = [];
    for (p = 1; p <= 24; p++) {
        kutular.push(p);
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    olusturkenar('div', 12, 'para kucuk', 'solpara', kucuk);
    yaziyazkenar(kucuk, 'solpara');

    olusturkenar('div', 5, 'para orta', 'sagparaorta', orta);
    yaziyazkenar(orta, 'sagparaorta');

    olusturkenar('div', 7, 'para buyuk', 'sagparabuyuk', buyuk);
    yaziyazkenar(buyuk, 'sagparabuyuk');

    var parakutu = [];

    //paralar kutulara rastgele dizilecek
    shuffle(paralar);

    function paradoldur(kutular) {
        for (k = 0; k < kutular.length; k++) {
            parakutu[k] = [kutular[k], paralar[k]];
        }
    }

    function shuffle(array) {

        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;

    };
    yaziyaz(kutular, 'ortaalan');
    paradoldur(kutular);

    function olustur(ogeadi, sayi, classname, idname, eventName, name) {
        for (i = 0; i < sayi; i++) {
            var oge = document.createElement(ogeadi);
            oge.className = classname;
            oge.id = idname + (i + 1);
            if (eventName !== undefined) {
                oge.onclick = function(j) {
                    return function() {
                        clickbtn(j);
                    };
                }(oge.id);
            }
            if (name !== undefined) {
                oge.name = 'button';
            }
            ogeler.appendChild(oge);
        }
        var div1 = document.getElementById(idname);
        div1.appendChild(ogeler);
        $(".kutu").appendTo('#kutular');
        $(".kutu.secilen").prependTo('#secili');
    }

    function olusturkenar(ogeadi, sayi, classname, idname, liste) {
        for (i = 0; i < sayi; i++) {
            var oge = document.createElement(ogeadi);
            oge.className = classname;
            if (liste[i] == 500000) {
                oge.id = idname + (liste[i] + (i - 3));
            } else {
                oge.id = idname + (liste[i]);
            }
            ogeler.appendChild(oge);
        }
        var div1 = document.getElementById(idname);
        div1.appendChild(ogeler);

    }

    function yaziyazkenar(listeadi, idadi) {
        for (h = 0; h < listeadi.length; h++) {
            var yazi;
            if (listeadi[h] == 500000) {
                yazi = document.getElementById(idadi + (listeadi[h] + (h - 3)));
            } else {
                yazi = document.getElementById(idadi + (listeadi[h]));

            }
            yazi.innerHTML = listeadi[h];
        }
    }

    function yaziyaz(listeadi, idadi) {
        for (h = 0; h < listeadi.length; h++) {
            var yazi = document.getElementById(idadi + (h + 1));
            yazi.innerHTML = listeadi[h];
        }
    }

    function degistir() {
        var bttn = document.getElementsByName('button');
        bttn.forEach(element => {
            element.className = 'kutu';
            element.disabled = false;
        });
    }

    function ustunuCiz(para1) {
        var acilankutu;
        if (kucuk.indexOf(para1) != -1) {
            acilankutu = document.getElementById("solpara" + para1);
            $(acilankutu).addClass('acildi');

            if ($(acilankutu).hasClass('kucuk')) {
                $(acilankutu).removeClass('kucuk');
            }

        } else if (orta.indexOf(para1) != -1) {
            acilankutu = document.getElementById("sagparaorta" + para1);
            $(acilankutu).addClass('acildi');

            if ($(acilankutu).hasClass('orta')) {
                $(acilankutu).removeClass('orta');
            }

        } else if (buyuk.indexOf(para1) != -1) {
            if (para1 == 500000) {
                acilankutu = document.getElementById("sagparabuyuk" + 500001);
                if ($(acilankutu).hasClass('acildi')) {
                    acilankutu = document.getElementById("sagparabuyuk" + 500002);
                    if ($(acilankutu).hasClass('acildi')) {
                        acilankutu = document.getElementById("sagparabuyuk" + 500003);
                    }
                }
            } else {
                acilankutu = document.getElementById("sagparabuyuk" + para1);
            }
            $(acilankutu).addClass('acildi');

            if ($(acilankutu).hasClass('buyuk')) {
                $(acilankutu).removeClass('buyuk');
            }
        }
    }



    function toplaGel(liste) {
        var toplam = 0;
        for (sayi = 0; sayi < liste.length; sayi++) {
            toplam += liste[sayi];
        }
        return toplam;
    }

    function teklifHesapla(liste, para) {
        /*liste açılan paralaarı*/
        /*para tüm  paralaarı*/
        var p1 = toplaGel(para);
        var p2 = toplaGel(liste);
        return ((p1 - p2) / (para.length - liste.length)).toFixed(0);
    }

    function hamdibey() {
        asama++;
        kutuSayisi = 0;
        console.log('aşama ' + asama);
        var teklif = teklifHesapla(paralar, acilan);
        var kutumdaki = document.getElementById(secilen).innerHTML;
        var d = parakutu[kutumdaki - 1];
        $('#teklif').html("<span> Hamdi bey'in teklifi: " + teklif + "TL</span>");
        if (confirm('Hamdi bey\'in teklifi:' + teklif + 'TL. \n Var mısın? Yok musun?')) {
            alert('Varım Diyor!');
            alert('Kazandığınız ödül:' + teklif);
            alert('Kutunuzdan çıkan ödül:' + d[1]);
        } else {
            $('#teklif').html('<span></span>');
        }
        if (acilan.length == 23) {
            var d = parakutu[kutumdaki - 1];
            alert('Kazandığınız ödül:' + d[1]);
        }

    }

    function kutuAc(kutuno, idname1) {
        var d = parakutu[kutuno - 1];
        //alert(d);
        acilan.push(d[1]);
        $('#' + idname1).prop('disabled', true);
        ustunuCiz(d[1]);
        kutuSayisi++;
        console.log("kutu " + kutuSayisi);
    }

    //1 tanesini kullanıcı seçecek
    function clickbtn(idname) {
        if (selected == 1) {
            if (idname != secilibtn) {
                if (kutuSayisi != teklifGeldi[asama]) {
                    var acilan = document.getElementById(idname).innerHTML;
                    kutuAc(acilan, idname);
                } else {
                    hamdibey();
                }
            }
        } else {
            degistir();
            var btn = document.getElementById(idname);
            secilen = idname;
            var secilibtn = document.getElementById("secilen");
            secilibtn.innerHTML = btn.innerHTML;
            btn.className += " secilen";
            selected = 1;
            btn.disabled = true;
        }
    }