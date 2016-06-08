export default function innerCrop (imgRect) {

  if (!imgRect) return null

  var h = imgRect.height
    , w = imgRect.width

  return (
    h > w ?
      {
        height: 'auto',
        width: '100%',
        top: ((h - w) / w / 2 * 100 * -1 + '%' )
      }
    : w > h ?
      {
        height: '100%',
        width: 'auto',
        left: ((w - h) / h / 2 * 100 * -1 + '%' )
      }
    :
      {
        height: '100%',
        width: '100%'
      }
  )
}
