import EvaluateInput from "../../../../Reviews/EvaluateInput";
import icon from "../../../../../constants/icon";
export default function PostComment(props: any) {
    const {
        data,
        video,
        handleComment,
        comment,
        handleViewAllCmt,
        handleKeyDown,
        user,
        handlePostComment,
        setComment,
    } = props;
    const PreviewComment = ({ index, val }: any) => {
        let body;
        try {
            const cmt = JSON.parse(`${val.body}`);
            body = {
                text: cmt.text,
                image_url: cmt.image_url,
                url: cmt.url,
            };
        } catch (error) {
            body = {
                text: val.body,
                image_url: "",
                url: "",
            };
        }
        return body.url && body.url !== "" ? (
            body.url === video.link ? (
                <div className="video-item-comments-preview_item">
                    <span className="cmt_name">{val?.user?.fullname}</span>
                    <span className="cmt_body">{body.text}</span>
                </div>
            ) : (
                <></>
            )
        ) : (
            <div className="video-item-comments-preview_item">
                <span className="cmt_name">{val?.user?.fullname}</span>
                <span className="cmt_body">{body.text}</span>
            </div>
        );
    };
    return (
        <div className="video-item_comments">
            {data?.cmt?.totalItem && data?.cmt?.totalItem > 0 ? (
                <>
                    <div className="video-item-comments-preview">
                        {data?.cmt?.comments
                            ?.map((item: any, index: any) => (
                                <PreviewComment key={index} val={item} />
                            ))
                            .slice(0, 2)}
                    </div>
                    <div
                        className="video-item-comments-read_all"
                        onClick={handleViewAllCmt}
                    >
                        Xem toàn bộ {data?.cmt?.totalItem}{" "}
                        <img src={icon.vector_down} alt="icon" />
                    </div>
                </>
                ):''
            }
            <EvaluateInput
                handleOnchange={handleComment}
                handleKeyDown={handleKeyDown}
                user={user}
                handlePostComment={handlePostComment}
            />
        </div>
    );
}
