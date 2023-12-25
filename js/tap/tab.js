const list = document.querySelectorAll('.tab-button')
const tab = document.querySelectorAll('.tab-content')

const btnAction = (n) => {
    for(let i=0 ; i< list.length; i++){
        if(i != n){
            list[i].classList.remove('orange')
            tab[i].classList.remove('show')
        }else{
            list[i].classList.add('orange')
            tab[i].classList.add('show')
        }
    }
}

$('.list').click(function(e){
    btnAction(e.target.dataset.id)
})

// jquery
// $('tab-button).eq(0).on('click', function() {
//  $('tab-button').removeClass('orange');  모든 버튼에 붙은 orange삭제
//  $('tab-button').eq(0).addClass('orange')  첫번째 버튼에만 orange추가
// })

// for(let i = 0; i<list.length; i++){
//     list[i].addEventListener('click', () => btnAction(i))
// }