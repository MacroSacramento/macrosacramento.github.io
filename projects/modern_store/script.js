$( document ).ready(() => calcMasonryHeight() )
$( window ).resize(() => calcMasonryHeight () )

function calcMasonryHeight() {
  var col1Height = 0
  var col2Height = 0
  $('.card img').each( ( index, element ) => {
    index % 2 == 1 ? col1Height += $( element ).height() : col2Height += $( element ).height()
  })
  var heightDiff = col1Height - col2Height
  $( '.card:last-child img' ).height( $( '.card:last-child img' ).height() - heightDiff )
}