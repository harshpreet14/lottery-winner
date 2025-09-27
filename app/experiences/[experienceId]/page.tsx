import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";
import { Card, Heading, Text } from "@whop/react/components";
import LotteryPicker from "../../components/lottery/LotteryPicker";
import "../../styles/lottery.css";

export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	// The headers contains the user token
	const headersList = await headers();

	// The experienceId is a path param
	const { experienceId } = await params;

	// The user token is in the headers
	const { userId } = await whopSdk.verifyUserToken(headersList);

	const result = await whopSdk.access.checkIfUserHasAccessToExperience({
		userId,
		experienceId,
	});

	const user = await whopSdk.users.getUser({ userId });
	const experience = await whopSdk.experiences.getExperience({ experienceId });

	// Either: 'admin' | 'customer' | 'no_access';
	// 'admin' means the user is an admin of the whop, such as an owner or moderator
	// 'customer' means the user is a common member in this whop
	// 'no_access' means the user does not have access to the whop
	const { accessLevel } = result;

	// Check if user has access to the lottery
	if (!result.hasAccess) {
		return (
			<div className="flex justify-center items-center h-screen px-8">
				<Card className="text-center p-8">
					<Heading size="6" className="text-red-600 mb-4">
						Access Denied
					</Heading>
					<Text size="4" className="text-gray-600 mb-2">
						You do not have access to this lottery experience.
					</Text>
					<Text size="2" className="text-gray-500">
						Your access level: <strong>{accessLevel}</strong>
					</Text>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<Card className="inline-block p-6 mb-6">
						<Heading size="8" className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
							🎡 Lottery Picker
						</Heading>
						<Text size="5" className="text-gray-700 mb-2">
							Welcome, <strong className="text-purple-600">{user.name}</strong>! 
						</Text>
						<Text size="2" className="text-gray-500">
							Experience: <strong>{experience.name}</strong> • 
							Access Level: <strong className="capitalize text-blue-600">{accessLevel}</strong>
						</Text>
					</Card>
				</div>

				{/* Lottery Picker Component */}
				<LotteryPicker />
			</div>
		</div>
	);
}
