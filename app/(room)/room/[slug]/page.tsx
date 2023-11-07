"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonalIcon } from "lucide-react";
import Loading from "@/components/sections/loading";
import ChatMessage from "@/components/sections/chat-message";
import VideoCanvas from "@/components/sections/video-canvas";

const RoomPage = ({ params }: { params: { slug: string } }) => {
	const supabase = createClientComponentClient();
	const [userData, setUserData] = useState<null | User>(null);
	const [username, setUsername] = useState<string>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			const getUserData = await supabase
				.from("Users")
				.select("username, id")
				.eq("email", user?.email);

			const fetchedUsername = getUserData.data?.[0]?.username;
			setUsername(fetchedUsername);
			setUserData(user);
			setLoading(false);
		};

		fetchUserData();
	}, [supabase.auth, supabase]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="h-[100dvh]">
			<div className="flex h-full w-full flex-col lg:flex-row">
				<VideoCanvas />
				<div className="flex h-[50%] w-full flex-1 flex-col border-t lg:h-full lg:border-l lg:border-t-0">
					<ScrollArea className="flex-grow overscroll-y-contain p-2">
						<ChatMessage username={username} />
					</ScrollArea>
					<div className="flex w-full items-center justify-between gap-x-2 border-t border-input">
						<Textarea
							className="min-h-0 resize-none border-none px-2 py-1 text-base ring-offset-0 focus:caret-indigo-500 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
							placeholder="Enter your message"
						/>
						<button className="mr-1">
							<SendHorizonalIcon className="h-6 w-6" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomPage;
