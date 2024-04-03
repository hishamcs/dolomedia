

function LikeComponent({likeCount}) {
  return (
    <>
        {likeCount ? (
            likeCount===1 ?(
                <span>1 Like</span>
            ) : (
                <span>{likeCount} Likes</span>
            )
        ) :(
            <span> No Likes</span>
        )}
    </>
  )
}

export default LikeComponent