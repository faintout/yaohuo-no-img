// ==UserScript==
// @name         妖火-内容禁止图片
// @namespace    http://tampermonkey.net/
// @version      2024-05-24
// @description  try to take over the world!
// @author       You
// @match        *://yaohuo.me/bbs-*.html*
// @match        *://yaohuo.me*
// @match        *://*.yaohuo.me/*
// @match        *://*.yaohuo.me/bbs-*.html*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    class ReplaceParentChild {
        constructor(imgDom) {
            this.imgUrl = imgDom.getAttribute('src');
            this.imgDom = imgDom
            this.init()
        }
        init() {
            if (this.imgDom.classList.contains('no-img')) {
                return
            }
            this.replaceDom(this.createDom());
        }
        createDom() {
            // 创建一个 <a> 元素
            const link = document.createElement('a');
            link.href = this.imgUrl;
            link.target = '_blank';

            // 创建一个 <img> 元素
            const image = document.createElement('img');
            image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAB/NJREFUeF7tnWtsVEUUx8+wdAvsFlooW0xaHpYKUto1UgMBEh8xEIlRDBjxkWKC0SiJEl4JhEQwCKYKEQ18IDECkUeixqgRAyo+QqOYWmgBQSgWWojs8milW1a2XcbMmi1r2e7eO3fuY+6cSRq+zJyZ8///ODN37rZLAJvSChCls8fkAQFQHAIEAAFQXAHF08cKgAAoroDi6WMFQAAUV0Dx9LECIACKK6B4+lgBEADFFVA8fawACIDiCiiePlYABEBxBRRPHysAAqC4AoqnjxUAAVBcAcXTN60C1NXRHE8ZjAYP+BTX2Fj6ceiMn4azVVWky1ig9KOFAnCcUm+8ExZSAnMIhWlmLFjVmJRALaHwqccHm8sJiYnSQRgARyP0OQCooQB3iFocxrldAQLwFwAsr/CTj0ToIwSAhg66mhB4XcSCMIY2BSiFNcE8slpb7757GQagMUIXA8AGowvB8foVIABLK/zEkPaGAGjspJOAQp3+peMIUQrQOEwJDiGHeOMZBeBjoDCXd3IcJ0ABAl9U+sjjvJG4AWi4QotJLrTyTozjxCngiUNZ+RDSxBORH4AIrSYA23kmxTGCFSDwUqWPbOWJagSAGgKwjGdSHCNWAUphUzCPLOKJyg1AY4RuA4D5PJPiGLEKEIAdFX7C5QU3AEcjdDsFqBabCkbjUUBaAPofPQa+XXuA/RsvCgANBCBWMRGiz8zj0UHZMVICMHDXHhi0a09a0xgM0afnwY2HH1LWVD2JSwfAkBWrEv/rMzUGQce6tYnKgC2zAlIBwIxnAGhp3RUT4e/1a7V0VbqPVAD4330Pcr89oNmw9g+2YhXIopZUAOQveBE8obBmAFgFYJUAW98KuBqAyKJX8TDopgqg5QCYmi9uAdlrn1QVgO3/7BygpbEnAAYANhc9BbD9nwGQ7TGQpYz7vzb0paoALCUGQd7KVRkPg+wSiO3/2LIrIB0ASQi83x247TaQlX1mvBNO/jsunoSGyOXET5F3UMKJmUNHQvWI8dldsbCHlAAk9WHVgITDiWrglKvfI5HL8HZLPYRi19PayGDYOHZ6DxQWep12KqkBsFu83vMz85c2Hcy6LCdBgABktUtbB63mJ6M5BQIEQJu/GXvpNd9JECAABgHgNd8pECAABgAwar4TIEAAOAEQZb7dECAAHACINt9OCBAAnQCYZb5dECAAOgAw23w7IEAANAJglflWQ+BaANhV7L6rLT1XspX+wsRdPE+z2nwrIXAdAMz4mpb6xEuY3o3dvi0beS/c4y/UzIFd5lsFgasAYOY/+/v+rOayN3Ja3srZbb4VELgGAK3mJ0XNBoFTzDcbAlcAoNf8bBA4zXwzIZAeAF7z+4LAqeabBYHUABg1vzcETjffDAikBUCU+VlPjA7tIOrzBFICoLr5qZVA72Ntb56lAwDN/7+FPHcbqRGkAgDNT78fGYFAGgDQ/MyHEV4IpAAAzdd2EuWBwPEAoPnazOc9GDoaADRfn/k8EDgWADSfz3y9EDgSADTfmPl6IHAcAGi+GPO1QuAoANB8seZrgcAxAKD55pifDQJHAIDmm2t+preIjgBgSdPBtJ/hs0YWtWZhl0U7J8zoSdp2AESYfzMWg5uRTtOc7D+0wLTYdgQO+gthw9jpialtBYD9GRX2Y6RFT/4BDAAzWz+vFzwFBeB10d8eTn4m0jYADkcuV2v5axqZjI2FwtAVCpnpfU9sBsHA8eMsmcuqSRgE80eMt/4LIza1tO57s6Xu1kbEmfE/Z/6EeKd5pb/3shgADAS3NHYeeGHEhP2vjSyZyZMT9zeGzGqobarrCJfyTJo6hpnPILCisXNAbnGxFVNZOkdVXuDM3uC0sTyT2g4AW3T31TbobmsD2mXKF2QndHHb/p9qtvQA8JCLY24pgAAoTgMCgADIfQZQ3D/D6WMFMCyh3AEQALn9M7x6VwDAroLNfAw0rHKGAB6fz8zwWWNLD8CN8+cTdwGyNnaz6C0pBrtAkBoAZjwDQPbGzB9QeqctaUgNgNXvAsx0yK73DFIDYOW7ADPNt/M9g9QAsMNfd1s7xNvaTP9MgBkAJD9n0L8g37a3jLYA8PyJ+iN7r5wLmiEqxtSnwH2DA01fVU4r0zfqv97cbwNrzp375J3W+jk8k+IYsQo8VXTX1++Xlc/iicoNwLZweMXyU7XreCbFMWIVWF82dcmCoqKNPFG5AVjWfOL+7RdO/sAzKY4Rq8A3d88uCQ4jXM/S3ACwFB5r/Lnll2sXS8Smg9H0KDB5cNHZLyunjtEzJrWvIQDWNTfP3n3p1Gd9fb8e76JwnDYFEr8fUD6jqtJHftM24vZehgBg4dY0n9my+ULjy7wLwHH8CrxSXLll9ejShfwRDDwFpE765LFfv/+x/cIDRhaCY/UpMHd42edbxk2crW+UCRUgGfLDUGjxhrOHa8JdUY/RReH4vhUI5AyMP1o4puat0nErRehkeAtIXcQjx3+aMConf82lWPTBU9fbh+HZQIRFkPiO4vyc3I6Ad8ChN4ZPfqI8QCJiIgvaAtIt5niY+nd3nJ5yOnpttKjFqhhn1ahJtf2i0CrSdGFPASoa4rachW4BbhNHhXwQABVczpAjAoAAKK6A4uljBUAAFFdA8fSxAiAAiiugePpYARAAxRVQPH2sAAiA4goonj5WAARAcQUUTx8rAAKguAKKp48VAAFQXAHF08cKgAAoroDi6f8Lj0sYvcOGtFEAAAAASUVORK5CYII=';
            // 将 <img> 元素添加到 <a> 元素中
            image.classList.add('no-img');
            image.style.width = '5%';
            image.style.position = 'relative';
            this.addEventListener(image)
            link.appendChild(image);
            return link
        }
        replaceDom(newDom) {
            this.imgDom.parentNode.replaceChild(newDom, this.imgDom);
        }
        addEventListener(image) {
            const previewDom = document.querySelector('#image-preview')
            const previewImg = previewDom.querySelector('img');
            image.addEventListener('mouseenter',  (e) =>{
                console.log('e',e.target.width);
                const offsetLeft = e.target.offsetLeft
                const offsetTop = e.target.offsetTop
                const width = e.target.width

                previewImg.src = this.imgUrl;
                previewDom.style.display = 'block';
                previewDom.style.left = offsetLeft +width/2 + 'px';
                previewDom.style.top = offsetTop - 50 + 'px';
                previewDom.style.transform = 'translate(-50%, -50%)';
                previewDom.style.opacity = 1;
                previewDom.addEventListener('mouseleave', function () {
                    previewDom.style.opacity = 0;
                    previewDom.style.display = 'none';
                });
            })
            image.addEventListener('mouseleave', function (e) {
                 previewDom.style.display = 'none';
            });
        }
    }
    const createImagePreview = ()=>{
        const div = document.createElement('div');
        div.id = 'image-preview';
        div.style.position = 'absolute';
        div.style.zIndex = '999';
        div.style.width = '100px';
        div.style.height = '100px';
        div.style.background = 'white';
        div.style.border = '1px solid #ccc';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 0 5px #ccc';
        div.style.display = 'none';
        div.style.overflow = 'hidden';
        div.style.transition = 'all 0.3s';
        div.style.pointerEvents = 'none';
        div.style.userSelect = 'none';
        const image = document.createElement('img');
        image.style.width = '100%';
        image.style.height = '100%';
        image.style.objectFit = 'contain';
        div.appendChild(image);
        document.body.appendChild(div);
    }
    //文章
    const replaceArticle = () => {
        const content = document.querySelector('.bbscontent');
        if (!content) {
            return
        }
        const images = content.querySelectorAll('img');
        images.forEach(function (img) {
            new ReplaceParentChild(img);
        });
    }
    //回复、附件
    const replaceReply = () => {
        var content = document.querySelectorAll('.recontent,.content');
        if (!content) {
            return
        }
        content.forEach(function (item) {
            var images = item.querySelectorAll('img');
            images.forEach(function (img) {
                var imgUrl = img.getAttribute('src');
                if (/face\/.*\.gif/gm.test(imgUrl)) {
                    return
                }
                if (/NetImages\/.*\.gif/gm.test(imgUrl)) {
                    return
                }
                new ReplaceParentChild(img);
            });
        });

    }

    //去除个人中心头像
    const replaceAvatar = () => {
        var avatarImg = document.querySelector('.touxiang img');
        if (!avatarImg) {
            return
        }
        new ReplaceParentChild(avatarImg);
    }
    createImagePreview()
    replaceArticle()
    replaceReply()
    replaceAvatar()
})();