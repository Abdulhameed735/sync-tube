"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter
} from "@/components/ui/dialog";
import CreateRoom from "@/components/sections/create-room";
import Room from "@/components/sections/room";

const App = () => {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [userData, setUserData] = useState<null | User>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			setUserData(user);
		};

		fetchUserData();
	}, [supabase.auth]);

	return (
		<div className="p-5">
			<p>Welcome {userData && userData.email}</p>

			<div className="mt-8 flex items-center justify-between">
				<h3 className="text-lg font-semibold">Rooms</h3>

				<Dialog>
					<DialogTrigger>
						<Button>
							<PlusCircleIcon className="mr-2 h-4 w-4" /> Join Room
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Join Room</DialogTitle>
							<DialogDescription>Input the room url you want to join</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="url">Room URL</Label>
								<Input id="url" placeholder="https://sync-tube.com/our-room" />
							</div>
						</div>
						<DialogFooter>
							<Button>Join Room</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				<CreateRoom />
				<Room />
				<Room />
				<Room />
				<Room />
				<Room />
			</div>
		</div>
	);
};

export default App;
