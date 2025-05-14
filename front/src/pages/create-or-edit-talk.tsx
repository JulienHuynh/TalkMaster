import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { CreateTalkProps } from "../types/Talk";
import Navbar from "../components/talk/navbar";
import Footer from "../components/talk/footer";
import useCreateTalk from "../hooks/useCreateTalk";
import { TalkForm } from "../components/talk/talk-form";
import { useGetTalk } from "../hooks/useGetTalkRequests";
import { defaultTalk } from "../constante/talk";


export const CreateTalk = () => {
  const { createTalk } = useCreateTalk();
  const location = useLocation();
  const isCreatePage = location.pathname === "/create-talk";

  const talkId = parseInt(location.pathname.split("/").pop() || "");

  const { talkData } = useGetTalk(talkId);

  const handleSubmit = async (formData: any) => {
    if (talkId) {
      // update talk
    } else {
      const newTalk = await createTalk(formData);
      console.log("New talk:", newTalk);
    }
  };

  const handleCancel = () => {
    // Reset form or navigate back
  };

  return (
    <>
      <div className="w-full mx-auto relative">
        <Navbar />
        <div className="absolute top-20 left-20 right-0">
          {isCreatePage ? (
            <Link to="/talk" className="text-white p-2 rounded-full mr-2 ">
              <ChevronLeft size={24} />
            </Link>
          ) : null}
          <div className="flex flex-col items-center justify-center mt-2">
            <TalkForm
              talk={(talkData || defaultTalk) as CreateTalkProps}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEdit={talkId ? true : false}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
