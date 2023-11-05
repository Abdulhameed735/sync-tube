import Link from "next/link";
import Image from "next/image";
import { MonitorPlayIcon } from "lucide-react";

const Footer = () => {
	const socials = [
		{
			name: "GitHub",
			url: "https://github.com/Abdulhameed735"
		},
		{
			name: "Twitter",
			url: "https://x.com/devabdultech"
		}
	];
	return (
		<footer className="flex flex-col items-start justify-between gap-2 border-t px-5 py-2 lg:flex-row lg:items-center lg:gap-0">
			<Link href="/">
				<div className="flex items-center gap-2 font-semibold lg:text-lg">
					<MonitorPlayIcon /> <h3>SyncTube</h3>
				</div>
			</Link>

			<div className="flex items-center gap-2">
				<p className="text-sm text-gray-500">
					Proudly cooked with ❤️ by{" "}
					<a
						className="font-semibold underline"
						href="https://abdultech-me.vercel.app"
						target="_blank"
					>
						abdultech
					</a>
				</p>

				<div className="flex items-center gap-2">
					{socials.map((social, index) => (
						<a key={index} href={social.url} target="_blank" className="text-md font-medium">
							<Image
								alt={social.name}
								height={18}
								width={18}
								src={`https://cdn.simpleicons.org/${social.name}`}
							/>
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
