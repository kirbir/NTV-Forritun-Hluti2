


const users = [
	{
		id: 0,
		name: "Shrek",
		bio: "Shrek is a large, green-skinned, physically intimidating ogre with a Scottish accent. In Shrek Forever After, however, it is revealed that he is much smaller than the average ogre. Even though his background is something of a mystery, according to Shrek the Musical, it is revealed that on his seventh birthday, Shrek was sent away by his parents, because it was an ogre tradition. (The original book also has his parents evicting him from their swamp.) He is seen traveling alone, being either screamed at or teased by passers-by. The only time he receives a pleasant greeting is a wave from a young Fiona, who is promptly led away by her parents. In the book, his parents threw him into a dark hole that leads to the real world.",
		voice: "Mike Myers",
		species: "Ogre, human briefly",
		image: "/shrek.png"
	},
	{
		id: 1,
		name: "Fiona",
		bio: "Princess Fiona is a fictional character in DreamWorks Shrek franchise. One of the film series main characters, Fiona first appears in Shrek (2001) as a beautiful princess cursed to transform into an ogre at night. She is initially determined to break the enchantment by kissing a prince, only to meet and fall in love with Shrek, an ogre, instead. The character's origins and relationships with other characters are further explored in subsequent films: she introduces her new husband, Shrek, to her parents in Shrek 2 (2004); becomes a mother by Shrek the Third (2007); and is an empowered warrior in Shrek Forever After (2010), much of which takes place in an alternate reality in which Fiona and Shrek never meet.",
		voice: "Cameron Diaz",
		species: "Ogre, human originally",
		image: "/fiona.png"
	},
	{
		id: 2,
		name: "Puss",
		voice: "Antonio Banderas",
		bio: "Puss in Boots (or simply Puss) is a main fictional character in the Shrek franchise. He made his first appearance in the film Shrek 2 (2004). He is also the title character and protagonist in the 2011 spin-off film Puss in Boots (in which his origins are described) and its 2022 sequel, Puss in Boots: The Last Wish (set sometime after Shrek Forever After). Puss also appears in the Netflix television series centered on him, The Adventures of Puss in Boots (2015–2018).",
		species: "Cat",
		image: "/puss.png"
	}
];

export type User = (typeof users)[number];

const sleep = async (durationInMs: number) => {
	const coinFlipPromise = new Promise((resolve) => {
		setTimeout(() => {
			resolve("heads");
		}, durationInMs);
	});
	await coinFlipPromise;
	console.log("done sleeping");
};

export const fakeGetAllUsers = async (): Promise<User[]> => {
	await sleep(1000);
	return users;
};

export const fakeGetUserFunction = async (
	name: string,
): Promise<User | string> => {
	await sleep(1000);
	const user = users.find((user) => 
		user.name.toLowerCase() === name.toLowerCase()
	);
	if (user) {
		return user;
	}
	return "No user";
};

