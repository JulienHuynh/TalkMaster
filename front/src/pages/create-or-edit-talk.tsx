import { IoChevronBack } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { TalkForm } from "../components/talk/TalkForm";
import { defaultTalk } from "../constante/talk";
import useCreateTalk from "../hooks/useCreateTalk";
import { useGetTalk } from "../hooks/useGetTalkRequests";

export const CreateTalk = () => {
  const { createTalk } = useCreateTalk();
  const location = useLocation();
  const isCreatePage = location.pathname === "/create-talk";

  const talkId = Number.parseInt(location.pathname.split("/").pop() || "");

  const { talkData } = useGetTalk(talkId);

  const handleSubmit = async (formData: any) => {
    if (talkId) {
      // update talk
    } else {
      await createTalk(formData);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <>
      <div className="w-full mx-auto relative">
        <div className="absolute top-20 left-20 right-0">
          {isCreatePage ? (
            <Link to="/talk" className="text-white p-2 rounded-full mr-2 ">
              <IoChevronBack size={24} />
            </Link>
          ) : null}
          <div className="flex flex-col items-center justify-center mt-2">
            <TalkForm
              talk={talkData || defaultTalk}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEdit={!!talkId}
            />
          </div>
        </div>
      </div>
    </>
  );
};
