/*
Events to do
- Cult collecting armaments of a banished god: stop them or gather the items to get the help of their go?
- Tree of might: Massive stat damage but everyone gets +4 strength; or fight tough dudes.
- Goblin invasion
- Gnoll raids
- Found kobolds in caves
- Monster slayer hunting manticore
- People turning into mindflayers
- Officials turn out to be clones.
- Blacksmith working on a masterwork weapon: Costs resources to get a weapon, or improve the military.
- Giant worm attacks
- Treasure map shows up
- Ancient temple is uncovered
- Druid grove
- Magic runes start appearing everywhere
- Prophesized sword shows up, but not in the hands of a dwarf!
- Mead shortage
- Brewers guild has been watering down their beer
- Defences are shoddy and in disrepair
- Clothing shortage
- Banquet
- Religious holidays - Day of floating axes. Fund
- Sovereign abdication - heirs fighting for the throne
- A tailor shows up from Bedegar, wants to make fine suits for everyone.
- Mysterious tower shows up: investigate for relics or seal it off?
- Hand of Vecna
- Eavensbane
- Pitax the Unassailable
*/

let endgameDeck = [
    {
        type: 'threat',
        name: "The Reliquary Opens...",
        text: "Across our domain, our people fight each other. A civil war is happening, instigated by that evil box. And now, at this fated hour, the Reliquary opens...//Sarkhet Kha'Zul has risen! The end has come for us!",
        choices: [
            {
                name: "Fight for our lives",
                test: ["The final battle"],
                success: { text: "This day will be marked forever as one of untold triumph." },
                failure: { s: -99, l: -99, e: -99, m: -99 }
            }
        ]
    },
]

let lategameDeck = [
    {
        type: 'opportunity',
        name: "A Retreat in the Woods",
        weight: 10,
        text: "A wealthy noble by the name of Rodgar Ironpot has invited members of the council to spend time at his family's forest lodge for some much needed rest.",
        choices: [
            {
                name: "Accept graciously",
                outcome: { text: "Enjoy a short rest." }
            }, {
                name: "Decline politely",
                test: ["DC 12 Persuasion"],
                success: { l: 1, e: 1 },
                failure: { e: -1 }
            }
        ]
    }
]

let storyDeck = [
    {
        type: 'threat',
        name: "The Reliquary",
        id: 'main-2',
        weight: 20,
        text: "Curator Kraeggar Ironbeard, head of the New Anvilhold National Museum, has acquired a highly unusual artefact through an auction: a curious black box of unknown construction, approximately 7 feet by 3 feet by 3 feet in its dimensions, and inscribed with strange runes in an unknown language. How mysterious!//The Curator would like to have the artefact put on display, and is willing to make a substantial donation in exchange.",
        choices: [
            {
                name: "Put it on display",
                outcome: { e: 5, text: "???", unlock: ['main-2'] }
            }, {
                name: "No, we should have it studied",
                outcome: { e: -1, text: "???", unlock: ['main-3'] }
            }
        ]
    },
]

let opportunityDeck = [
    {
        type: 'opportunity',
        name: "The Omenmaster",
        text: "Whilst travelling, you encountered an old ruin. Living in the ruin was an even older witch called the Omenmaster, who claimed she could see 'beyond the shroud of time and space.' She offered to grant her wisdom, and in exchange she asked that we help restore the ruins.",
        choices: [
            {
                name: "Accept her offer",
                outcome: { e: -3, p: 1}
            }, {
                name: "Implore her to help for free",
                test: ["DC 20 Loyalty"],
                success: { l: 1, p: 1},
                failure: null
            }
        ]
    },
    {
        type: 'opportunity',
        name: "A Bard's Ballad",
        text: "A wandering entertainer has graced our taverns with her presence. We might be able to get some good information out of her.",
        choices: [
            {
                name: "Let coin do the talking",
                outcome: { e: -1, i: 1 }
            }, {
                name: "Smoothtalk her for information",
                test: ["DC 15 Persuasion"],
                success: { i: 1 },
                failure: null
            }, {
                name: "Challenge her to a contest",
                test: ["DC 20 Performance"],
                success: { i: 3 },
                failure: null
            }
        ]
    },
    {
        type: 'opportunity',
        name: "The Earl of Svind",
        text: "Earl Rodiri Flashheart - a noble from Svind - has paid us a visit hoping to foster an alliance. They're charming, delightful and might even loan us some troops. They're also fabulously wealthy, so we could engineer a trade agreement that substantially favours us.",
        choices: [
            {
                name: "Forge an alliance",
                test: ["DC 15 Persuasion"],
                success: { m: 2, a: 1, ally: 'Earl Flashheart' },
                failure: null
            },
            {
                name: "Exploit for financial gain",
                test: ["DC 18 Deception"],
                success: { e: 4 },
                failure: null
            },
            {
                name: "Arrange a marriage?",
                test: ["DC 20 Investigation"],
                success: { e: 4, m: 2, a: 1, ally: 'Earl Flashheart' },
                failure: null
            }
        ]
    },
    {
        type: 'opportunity',
        name: "The Festival of Colours",
        text: "Every year, a delightful event is held in the capital: the Festival of Colours. People from accross the whole world travel to see the performances, eat the food, and enjoy the company of one of the most vibrant cultures around.",
        choices: [
            {
                name: "Spare no expense",
                outcome: { e: -4, s: 4, l: 4 }
            },
            {
                name: "Capitalize on the tourism",
                test: ["DC 15 Stability"],
                success: { e: 4 },
                failure: { e: 1 }
            },
            {
                name: "Perform for the city",
                test: ["DC 15 Performance"],
                success: { s: 3, l: 3 },
                failure: null
            }
        ]
    },
    {
        type: 'opportunity',
        name: "The Great Cheese Experiment",
        weight: 2,
        text: "A strange wizard by the name of Warrick Gelmodt has approached us with an unusual request: funding to perform an arcane experiment. The nature of experimentation? Cheese replication. If successful, food shortages will a thing of the past! So he claims.",
        choices: [
            {
                name: "Funding granted",
                outcome: { e: -3, unlock: ["cheese-2"] }
            },
            {
                name: "Request denied",
                outcome: null
            }
        ]
    },
    {
        type: 'opportunity',
        name: "Quivicar the Merchant",
        text: "A mangy kobold has found his way into our court. As disgusting as the creature is, he seems to be a successful merchant, and is offering us many things he claims will be invaluable to us.",
        choices: [
            {
                name: "Purchase two items",
                outcome: { e: -2, r: 2, unlock: ["quivicar-2"] }
            },
            {
                name: "Purchase one item",
                outcome: { e: -1, r: 1, unlock: ["quivicar-2"] }
            },
            {
                name: "Begone wretched creature",
                outcome: { l: 1 }
            }
        ]
    },
]





let battleDeck = [
    {
        type: 'battle',
        name: 'A Matter of Honour!',
        text: "A foreign dignitary from Ardisia, a human noble by the name of Lord Adrian Eikelbart, got embroiled in a heated argument with the Sovereign, and things got out of hand. Words were spoken publicly that cannot be unsaid. A duel has been arranged, and it can't be stopped.//Now someone must represent New Anvilhold to protect the our honour! The duel is to the first to yield, and magic is forbidden.",
        choices: [
            {
                name: "Defeat Lord Eikelbart in a duel",
                test: ["Combat"],
                success: { l: 5, a: 1, ally: 'Lord Eikelbart' },
                failure: { l: -10 }
            },
            {
                name: "Pay him off",
                outcome: { e: -5 }
            }
        ]
    }, {
        type: 'battle',
        name: 'Kobold Surprise!',
        text: "A swarm of kobolds from nearby Bleakwood have assailed our lands. We must must send a message that we are no weaklings.",
        choices: [
            {
                name: "Defeat 100 kobolds in 3 rounds",
                test: ["Combat"],
                success: { s: -1, l: 3 },
                failure: { s: -5 }
            },
            {
                name: "Send in the legionnaires",
                test: ["DC 18 Military"],
                success: { s: -1, m: -1 },
                failure: { s: -3, m: -6 }
            },
            {
                name: "[LO] Kobold: Join us, kobolds",
                test: ["DC 15 Loyalty", "DC 15 Persuasion"],
                success: { s: -3, a: 1, ally: 'Snaggletooth Kobolds' },
                failure: { s: -6 }
            }
        ]
    },
]











let dilemmaDeck = [
    {
        type: 'dilemma',
        name: 'Returned Exile',
        text: "Thirty years ago, a once-great warrior named Galia Stoneheart was banished from our lands for murder. She has recently returned, despite her exile. What should be done?",
        choices: [
            {
                name: "Public execution!",
                outcome: { l: 4 }
            },
            {
                name: "A lifetime in the mines!",
                outcome: { e: 3, l: 2 }
            },
            {
                name: "Press her into military service!",
                outcome: { l: -3, m: 3 }
            },
            {
                name: "Forgive her!",
                outcome: { s: -2, l: -6, m: 3, a: 1, ally: 'Galia Stoneheart' }
            },
        ]
    },
    {
        type: 'dilemma',
        name: 'Bank Heist',
        weight: 4,
        text: "There's been a string of heists recently, and the latest target is the biggest yet: the Royal Bank of New Anvilhold! We need to catch the theives!",
        choices: [
            {
                name: "Chase after them",
                test: ["DC 15 Athletics"],
                success: { text: 'No effect', unlock: ['idralax-2']},
                failure: { e: -5, unlock: ['idralax-2'] }
            },
            {
                name: "Track them to their hideout",
                test: ["DC 18 Survival"],
                success: { i: 2, e: 2, unlock: ['idralax-2'] },
                failure: { e: -5, unlock: ['idralax-2'] }
            },
            {
                name: "[LO] Thieves' Cant: Take a stroll",
                outcome: { i: 2, e: 2, unlock: ['idralax-2'] },
            },
        ]
    },
    {
        type: 'dilemma',
        name: 'Otherworldly Refugees',
        text: "A mysterious portal opened and a couple thousand people have showed up. Apparently their own world was destroyed and they escaped in the nick of time. What should we do?",
        choices: [
            {
                name: "Let them settle in our lands",
                test: ["DC 14 Stability"],
                success: { l: 3, e: 3 },
                failure: { l: -1, s: -2, e: -3 }
            },
            {
                name: "Help them settle elsewhere",
                test: ["DC 16 Survival"],
                success: { s: 2 },
                failure: { s: -2 }
            },
        ]
    },
    {
        type: 'dilemma',
        name: 'Displacer Beast Stampede',
        text: "A number of displacer beasts have escaped a city managerie and are running amuck. They've not killed anyone yet, but have injured a few people, and everyone's getting nervous.",
        choices: [
            {
                name: "Just kill them",
                test: ["DC 13 Attack"],
                success: { l: -1 },
                failure: { l: -1, m: -1, s: -1 }
            },
            {
                name: "Herd them to the wilderness",
                test: ["DC 16 Animal Handling"],
                success: { l: 1, s: -1 },
                failure: { l: 1, s: -3 }
            }            
        ]
    },
    {
        type: 'dilemma',
        name: 'The Bones of a Saint',
        text: "Ghosts have started appearing around a local temple housing the sacred remains of Saint Gaelmyr, and are cursing priests! We must stop this at once!",
        choices: [
            {
                name: "Reconsecrate the remains",
                test: ["DC 17 Religion"],
                success: { l: 2, p: 1},
                failure: { l: -1, s: -1}
            },
            {
                name: "Expunge the ghosts",
                test: ["DC 15 Attack"],
                success: { s: 2 },
                failure: { m: -2 }
            }
        ]
    },
    {
        type: 'dilemma',
        chain: 'cult',
        name: "They Took Our Children!",
        text: "A number of children have been abducted from one of our villages! Reports indicate that those responsible wore grey robes and used dark magics. We should be careful.",
        choices: [
            {
                name: "Investigate it personally",
                test: ["DC 15 Investigation"],
                success: { i: 1, l: 2 },
                failure: { l: -4 }
            },
            {
                name: "Hire mercenaries",
                test: ["DC 12 Insight"],
                success: { e: -2, l: 2 },
                failure: { e: -2, l: -4 }
            }
        ]
    },
    {
        type: 'dilemma',
        chain: 'cult',
        name: "The Verdant Rot",
        text: "A strange affliction is spreading through our lands. Those affected bear evil green wounds that spread across their whole body before slowly weakening them to death.",
        choices: [
            {
                name: "Develop a treatment",
                test: ["DC 15 Medicine", "DC 12 Arcana"],
                success: { l: 1, s: -1 },
                failure: { l: -3, s: -3 }
            },
            {
                name: "Have the soldiers assist civilians",
                test: ["DC 20 Military"],
                success: { s: 3, l: -3 },
                failure: { m: -3, l: -3 }
            }
        ]
    },
    {
        type: 'dilemma',
        name: "The Tribe of Boneaxe",
        text: "A tribe of orcs has been discovered right under our noses, dwelling in a nearby forest! The Boneaxes were supposedly exiled by Galmog the Even Greater for being 'too nice'. They're apparently quite civilised and are seeking to peacefully coexist with us.",
        choices: [
            {
                name: "The only good orc is a dead orc",
                test: ["DC 18 Military"],
                success: { l: 3, m: -1, r: 1 },
                failure: { l: 3, m: -4 }
            }, 
            {
                name: "Send them away",
                outcome: { l: -5 }
            },
            {
                name: "[LO] Orcish: Let's bury the axe",
                test: ["DC 25 Loyalty"],
                success: { s: 3, a: 1, ally: 'The Boneaxe Orcs' },
                failure: { l: -5, a: 1, ally: 'The Boneaxe Orcs' }
            }
        ]
    },
    {
        type: 'dilemma',
        name: "A Miner Problem",
        text: "A wealthy noble is opening a new mine, which will bring in a great deal of money. The catch is its in an ancient wode, and the local druids are not thrilled with the idea.",
        choices: [
            {
                name: "Don't interfere",
                outcome: { e: 8, s: -5 }
            },
            {
                name: "Declare the wode a national park",
                outcome: { l: -3 }
            },
            {
                name: "[LO] Sylvan: Calm the wode",
                test: ["DC 15 Nature"],
                success: { e: 8 },
                failure: { e: 8, s: -5, l: -3 }
            },
            {
                name: "[LO] Druidic: Talk to the druids",
                test: ["DC 10 Nature", "DC 15 Persuasion"],
                success: { e: 4 },
                failure: { e: 4, s: -5, l: -3 }
            },
        ]
    },
    {
        type: 'dilemma',
        name: "Siegeball Scandal",
        weight: 3,
        text: "The Sovereign had too much to drink and for some inexplicable reason, publicly supported the Grauhul international siegeball team. Their next match is soon and it's against us! If we win, the Sovereign will be humiliated! If we lose, then the Sovereign will have humiliated his own people! It's a catastrophy!",
        choices: [
            {
                name: "Issue a public appology",
                test: ["DC 15 Performance"],
                success: { s: -1, unlock: ['siege-2'] },
                failure: { l: -3, s: -3, unlock: ['siege-2'] }
            },
            {
                name: "Say nothing",
                test: ["DC 20 Loyalty"],
                success: { l: 1, unlock: ['siege-2'] },
                failure: { l: -5, unlock: ['siege-2'] }
            }
        ]
    },
]













let crisisDeck = [
    {
        type: 'rift',
        name: "Astral Rift!",
        weight: 10,
        text: "An tear in the fabric of reality is forming right next to our capital! This is an emergency! Who knows what could happen if it's left to grow!",
        choices: [
            {
                name: "Attempt to seal it shut",
                test: ["DC 22 Arcana", "DC 22 Nature"],
                success: { e: -3, text: "The rift is sealed.", unlock: [] },
                failure: { e: -3, text: "???", unlock: ['rift-1', 'rift-2', 'rift-3', 'rift-4', 'rift-5'] }
            },
            {
                name: "Do not interfere",
                outcome: { text: "???", unlock: ['rift-1', 'rift-2', 'rift-3', 'rift-4', 'rift-5'] }
            },
        ]
    },
    {
        type: 'crisis',
        name: "The Chisel Census!",
        text: "The results of the chisel census have just come in, and the news is dire: household chisels are at an all time low!",
        choices: [
            {
                name: "Urge everyone to remain calm",
                test: ["DC 20 Stability", "DC 20 Persuasion"],
                success: { s: 2},
                failure: { s: -8}
            },
            {
                name: "Demand more chisels be made",
                test: ["DC 20 Economy", "DC 20 Intimidation"],
                success: { e: -2, s: 3},
                failure: { e: -3, s: -5}
            }
        ]
    },
    {
        type: 'crisis',
        name: "Border Conflict!",
        text: "A minor trade dispute with the neigbouring evlen state of Lyrasel has blown up into a full on war! We need to resolve this conflict before it gets out of hand.",
        choices: [
            {
                name: "Annex those knife-eared bastards",
                test: ["DC 17 Military", "DC 13 Intimidation"],
                success: { m: -2, s: -1, e: 3, r: 1 },
                failure: { m: -3, s: -3, l: -2 }
            }, 
            {
                name: "[LO] Elvish: Call for a ceasefire",
                test: ["DC 16 Persuasion", "DC 16 Insight"],
                success: { s: -1, a: 1, ally: 'The Lyrasel Elves' },
                failure: { m: -2, s: -2, e: -2 }
            }
        ]
    },
    {
        type: 'crisis',
        name: "The Dead March!",
        text: "Beware! Across our lands, the dead are rising up and attacking the living! People are panicking in the streets, and there are instances of rioting and looting.//We have as many priests and paladins as we can get fighting the undead, but it might not be enough. We must act now before it's too late.",
        choices: [
            {
                name: "Take control of them",
                test: ["DC 20 Religion", "DC 20 Arcana"],
                success: { m: 8, a: 1, ally: 'The Undead Legion' },
                failure: { m: -3, s: -6 }
            },
            {
                name: "Smite those abominations",
                test: ["DC 15 Military", "DC 15 Religion"],
                success: { l: 1, s: -1 },
                failure: { m: -3, s: -3 }
            }
        ]
    },
    {
        type: 'crisis',
        name: "Tax Revolt!",
        text: "A large number of disatisfied citizens have stopped paying what is rightfully due to their lords! This is unacceptable! There are even reports of some of our tax collectors being lynched! We must do something!",
        choices: [
            {
                name: "Overhaul the tax codes",
                test: ["DC 18 History", "DC 14 Investigation"],
                success: { e: -1, s: 3 },
                failure: { e: -4, s: -1, l: -1 }
            },
            {
                name: "Execute these criminals",
                test: ["DC 15 Intimidation", "DC 15 Loyalty"],
                success: { e: 1, s: -1 },
                failure: { e: -3, s: -3, l: -3 }
            }
        ]
    },
    {
        type: 'dragon',
        name: "The Green Dragon!",
        id: "dragon-1",
        weight: 10,
        text: "Aziltraxia, the dragon of Mount Skullbane, has attacked one of our cities, flooding the streets with her toxic breath! She demands tribute, threatening the lives of our citizens!",
        choices: [
            {
                name: "Give in to her demands",
                outcome: { e: -6, unlock: ['dragon-2']}
            },
            {
                name: "Drive Aziltraxia away",
                test: ["DC 18 Military", "DC 15 Attack"],
                success: { m: -2, unlock: ['dragon-3', 'hobgoblin-2'] },
                failure: { m: -5, s: -2, e: -4, unlock: ['dragon-3', 'hobgoblin-2']}
            },
            {
                name: "[LO] Draconic: Reason with her",
                test: ["DC 20 Persuasion"],
                success: { text: "???", unlock: ['dragon-5'] },
                failure: { s: -2, e: -4, unlock: ['dragon-3', 'hobgoblin-2'] }
            },
        ]
    },
    {
        type: 'crisis',
        name: "Insurrection!",
        text: "One of our generals - Milda Quartzknuckle, Lady of the Hammer - is trying to seize political power!",
        choices: [
            {
                name: "Allow it to happen",
                outcome: { m: 5, l: -8 }
            },
            {
                name: "Arrange an 'accident'",
                test: ["DC 20 Stealth", "DC 15 Attack"],
                success: { m: -2, s: -2 },
                failure: { m: -8, s: -2, l: -5 }
            },
            {
                name: "Order her to forget it",
                test: ["DC 20 Intimidation", "DC 15 Loyalty"],
                success: null,
                failure: { m: -7, l: -10 }
            },
            {
                name: "Appease her with an accolade",
                test: ["DC 20 Performance"],
                success: { m: -2, l: -2 },
                failure: { m: -5, l: -8 }
            }
        ]
    },
]









let locked = [
    {
        type: 'rift',
        name: "Rift Pulse: Overgrowth!",
        id: "rift-1",
        weight: 2,
        text: "Arcane energies have flooded out of the rift, causing plants to grow to unnatural proportions! Our roads have become overgrown and the land is much more difficult to traverse now.",
        choices: [
            {
                name: "Have a legion clear the roads",
                test: ["DC 18 Military"],
                success: { m: -3 },
                failure: { s: -3, e: -3 }
            },
            {
                name: "Call upon the people to clear it up",
                test: ["DC 18 Loyalty"],
                success: { s: 1, l: 1},
                failure: { s: -3, l: -3, e: -3 }
            }
        ]
    },
    {
        type: 'rift',
        name: "Rift Pulse: Amnesia!",
        id: "rift-2",
        weight: 2,
        text: "A cascade of magic has escaped the rift, and people are forgetting things about themselves, and more importantly, who their leaders are!",
        choices: [
            {
                name: "Make an impassioned speech",
                test: ["DC 20 Loyalty", "DC 20 Persuasion"],
                success: null,
                failure: { s: -3, l: -5 }
            }, {
                name: "Counteract the magic",
                test: ["DC 20 Arcana", "DC 20 Medicine"],
                success: null,
                failure: { s: -3, l: -5 }
            }
        ]
    },
    {
        type: 'rift',
        name: "Rift Pulse: Spellrot!",
        id: "rift-3",
        weight: 2,
        text: "The rift is unleashing magical energies that are sapping the arcane forces powering New Anvilhold's wards and enchantments!",
        choices: [
            {
                name: "Just replace the wards",
                outcome: {e: -6},
            }, {
                name: "Try to block the magic",
                test: ["DC 20 Arcana"],
                success: null,
                failure: { m: -3, s: -3, e: -3}
            }, {
                name: "[LO] Celestial: Call upon the Gods",
                test: ["DC 12 Religion"],
                success: { l: 5 },
                failure: { m: -3, l: -3, s: -3, e: -3}
            }
        ]
    },
    {
        type: 'rift',
        name: "Rift Pulse: Elementals!",
        id: "rift-4",
        weight: 2,
        text: "A horde of fire elementals have cascaded out of the rift! We must do something about this!",
        choices: [
            {
                name: "Fight fire with... steel?",
                test: ["DC 15 Military"],
                success: { m: -2, s: -1 },
                failure: { m: -4, s: -5 }
            },
            {
                name: "[LO] Primordial: Reason with them?",
                test: ["DC 20 Persuasion", "DC 15 Nature"],
                success: { m: 5, a: 1, ally: "Ashborn Elementals"},
                failure: { m: -2, s: -10 }
            }
        ]
    },
    {
        type: 'rift',
        name: "Rift Pulse: Aliens!",
        id: "rift-5",
        weight: 2,
        text: "A strange battleship bristling with weapons was ejected from the rift and is attacking our hold!",
        choices: [
            {
                name: "Retaliate",
                test: ["DC 18 Military"],
                success: { m: -2 },
                failure: { m: -6, s: -6 },
            }, {
                name: "Let them take what they're after",
                outcome: { s: -4}
            }, {
                name: "[LO] Gith: Negotiate with them",
                test: ["DC 18 History"],
                success: { text: "???", unlock: ['gith'] },
                failure: { s: -6, l: -3}
            }
        ]
    },
    {
        type: 'opportunity',
        name: "The Githyanki",
        id: "gith",
        weight: 10,
        text: "We have determined that the aliens that attacked us are Githyanki, and according to our understanding, they're tracking down a Silver Sword that used to be theirs.",
        choices: [
            {
                name: "Well, good luck with that",
                outcome: null
            }, {
                name: "[LO] Gith: You mean this sword?",
                test: ["DC 15 History", "DC 15 Persuasion"],
                success: { r: -1, a: 1, ally: "Githyanki Warriors" },
                failure: { r: -1 }
            }
        ]
    },
    {
        type: 'dragon',
        name: "Ill Tidings",
        id: "dragon-2",
        weight: 3,
        text: "The dragon Aziltraxia is back! However, it seems she was pleased by our offering and this time she bears a gift of knowledge. From her lair atop Mount Skullbane, she has spied evil from accross the border. She brings tidings of an army of hobgoblins moving south - directly towards us!",
        choices: [
            {
                name: "We'll be ready for them",
                outcome: { i: 3, unlock: ['hobgoblin-1', 'dragon-3'] }
            },{
                name: "Bolster our forces",
                outcome: { i: 3, e: -3, m: 5, unlock: ['hobgoblin-1', 'dragon-4'] }
            }, {
                name: "[LO] Draconic: Beg her for a loan",
                test: ["DC 15 Persuasion"],
                success: { i: 3, e: 3, m: 3, unlock: ['hobgoblin-1', 'dragon-4'] },
                failure: { i: 3, text: "she may be offended", unlock: ['hobgoblin-1'] }
            }
        ]
    },
    {
        type: 'dragon',
        name: "Ill Tidings",
        id: "dragon-5",
        weight: 3,
        text: "The dragon Aziltraxia is back! However, it seems she was amused by our last interaction and this time she bears a gift of knowledge. From her lair atop Mount Skullbane, she has spied evil from accross the border. She brings tidings of an army of hobgoblins moving south - directly towards us!",
        choices: [
            {
                name: "We'll be ready for them",
                outcome: { i: 3, unlock: ['hobgoblin-1', 'dragon-3'] }
            }, {
                name: "Bolster our forces",
                outcome: { i: 3, e: -3, m: 5, unlock: ['hobgoblin-1', 'dragon-4'] }
            }, {
                name: "[LO] Draconic: Beg her for a loan",
                test: ["DC 15 Persuasion"],
                success: { i: 3, e: 3, m: 3, unlock: ['hobgoblin-1', 'dragon-4'] },
                failure: { i: 3, text: "she may be offended", unlock: ['hobgoblin-1'] }
            }
        ]
    },
    {
        type: 'dragon',
        name: "The Hobgoblins Arrive!",
        id: "hobgoblin-1",
        weight: 3,
        text: "Aziltraxia was right! The hobgoblins have charged our borders. It's clear they want blood. They call themselves the Lichbane Corps and are set on destorying our nation!",
        choices: [
            {
                name: "Sabotage their camp",
                test: ["DC 18 Stealth"],
                success: { i: 3, m: 3 },
                failure: { m: -3 }
            },
            {
                name: "Assault them full on",
                test: ["DC 20 Military"],
                success: { m: -2 },
                failure: { m: -8 }
            },
            {
                name: "Assassinate their leadership",
                test: ["DC 17 Attack", "DC 17 Stealth"],
                success: null,
                failure: { s: -8 }
            },
            {
                name: "[LO] Goblin: Pay them to work for us",
                test: ["DC 18 Persuasion"],
                success: { e: -4, m: 5, a: 1, ally: "The Lichbane Corps" },
                failure: { e: -8, m: 5, a: 1, ally: "The Lichbane Corps" },
            }
        ]
    },
    {
        type: 'crisis',
        name: "Hobgoblin Invasion!",
        id: "hobgoblin-2",
        weight: 3,
        text: "An army of hobgoblins called the Lichbane Corps have crossed our borders and are causing chaos!",
        choices: [
            {
                name: "Sabotage their camp",
                test: ["DC 18 Stealth"],
                success: { i: 3, m: 3 },
                failure: { m: -3 }
            },
            {
                name: "Assault them full on",
                test: ["DC 20 Military"],
                success: { m: -2 },
                failure: { m: -8 }
            },
            {
                name: "Assassinate their leadership",
                test: ["DC 17 Attack", "DC 17 Stealth"],
                success: null,
                failure: { s: -8 }
            },
            {
                name: "[LO] Goblin: Pay them to work for us",
                test: ["DC 18 Persuasion"],
                success: { e: -4, m: 5, a: 1, ally: "The Lichbane Corps" },
                failure: { e: -8, m: 5, a: 1, ally: "The Lichbane Corps" },
            }
        ]
    },
    {
        type: 'dragon',
        name: "Aziltraxia Returns!",
        id: "dragon-3",
        weight: 3,
        text: "The green dragon has come back with a vengeance, and is demanding even more wealth!",
        choices: [
            {
                name: "Give in to her demands",
                outcome: { e: -7}
            },
            {
                name: "Drive Aziltraxia away again",
                test: ["DC 18 Military", "DC 15 Attack"],
                success: { m: -2 },
                failure: { m: -5, s: -2, e: -4 }
            }, 
            {
                name: "[LO] Draconic: Reason with her",
                test: ["DC 22 Persuasion"],
                success: { text: "???", unlock: ['dragon-5'] },
                failure: { s: -2, e: -4, unlock: ['dragon-3', 'hobgoblin-2'] }
            },
        ]
    },
    {
        type: 'dragon',
        name: "Aziltraxia's Offer",
        id: "dragon-4",
        weight: 3,
        text: "The green dragon has come before us once more with a tempting offer. In exchange for a king's ransom, she is willing to pledge her support to our nation. To have a dragon on our side would be incredibly valuable!",
        choices: [
            {
                name: "Accept her offer",
                outcome: { e: -8, a: 1, m: 5, i: 3, ally: 'Aziltraxia' }
            },
            {
                name: "[LO] Draconic: Bargain with her",
                test: ["DC 20 Persuasion"],
                success: { e: -3, a: 1, m: 5, ally: 'Aziltraxia' },
                failure: { text: "She will be spurned." }
            }
        ]
    },
    {
        type: 'crisis',
        name: "Experiment gone wrong!",
        id: "cheese-2",
        weight: 5,
        text: "We made a terrible mistake! All the cheese in New Anvilhold has melted! It's a calamity! People are rioting. Curse that crazy wizard Warrick!",
        choices: [
            {
                name: "Exile all wizards",
                outcome: { s: -5, unlock: ['cheese-3'] }
            }, {
                name: "Execute Warrick",
                outcome: { s: -2 }
            }, {
                name: "Let him try to fix it",
                outcome: { s: -2, e: -3, unlock: ['cheese-4'] }
            }
        ]
    },
    {
        type: 'crisis',
        name: "Attack of the Cheese!",
        id: "cheese-3",
        weight: 10,
        text: "Inconceivable! The exiled wizards have enchanted what remains of the kingdom's cheese and it's formed a 70-foot tall golem that's rampaging through our lands!",
        choices: [
            {
                name: "Pull out the siege weapons",
                test: ["DC 20 Military", "DC 20 Attack"],
                success: { s: -3},
                failure: { s: -6, m: -4 }
            }, {
                name: "Try to wrest control of it",
                test: ["DC 22 Arcana", "DC 22 Acrobatics"],
                success: { s: -1, a: 1, ally: 'The Cheese Golem' },
                failure: { s: -6 }
            }
        ]
    },
    {
        type: 'opportunity',
        name: "The Cheese Gambit",
        id: "cheese-4",
        weight: 10,
        text: "In a shocking turn of events, the wizard Warrick might have managed to salvage the cheese situation. It seems he was able to design a spell that could either produce nigh-infinite quantities of cheese, or alternatively merge the kingdom's cheese into some sort of... cheese golem? He needs some help with the execution of the spell either way.",
        choices: [
            {
                name: "Infinite cheese",
                test: ["DC 15 Arcana"],
                success: { s: 3, e: 3, l: 3 },
                failure: null
            }, {
                name: "Cheese golem",
                test: ["DC 22 Arcana"],
                success: { m: 8, a: 1, ally: 'Cheese Golem' },
                failure: null
            }
        ]
    },
    {
        type: 'crisis',
        name: "Siegeball Riot!",
        id: "siegeball-2",
        weight: 3,
        text: "The Grauhul match was a disaster! It was the first match to end in a draw in over fourty years! The fans are so upset that they've besieged the nearby city-state of Sanues just to see some real action! It's a diplomatic incident!",
        choices: [
            {
                name: "Demand a rematch!",
                test: ["DC 15 Performance"],
                success: { s: -1, unlock: ['siege-2'] },
                failure: { l: -3, s: -3, unlock: ['siege-2'] }
            },
            {
                name: "Say nothing",
                test: ["DC 20 Loyalty"],
                success: { l: 1, unlock: ['siege-2'] },
                failure: { l: -5, unlock: ['siege-2'] }
            }
        ]
    },
    {
        type: 'battle',
        name: 'Death to the Sovereign!',
        id: 'idralax-2',
        weight: 2,
        text: "It's Founding Day: the aniversary of the liberation of Anvilhold from the Orcs, and a huge cause for celebration! During the festivities, as Sovereign Kalgar Steeljaw I was making an impassioned speech, several masked individuals charged the stage, brandishing concealed weapons! // It's clear that they intend to kill the Sovereign and strike a heavy blow to the very fabric of our society! They must be stopped before they kill the Sovereign!",
        choices: [
            {
                name: "Defend the Sovereign",
                test: ["Combat"],
                success: { l: 2, s: 2, i: 2, unlock: ["idralax-3"]},
                failure: { l: -10, s: -10 }
            }
        ]
    },
    {
        type: 'battle',
        name: "Web of Treachery!",
        id: 'idralax-3',
        weight: 2,
        text: "Right in the heart of our nation, a deadly conspiracy has been exposed! Idralax the All-Seeing, an aberration of the vilest kind, has been working tirelessly to undermine our efforts to succeed. It's the one responsible for the assassination attempt and the heists taking place in our nation! It wants to usurp our gorvernment and become a tyrant! We can't stand for this!//We've got the bastard cornered but our soldiers don't have the experience to deal with it properly. So we're going to need the council to deal with it themselves. May the Gods be on your side!",
        choices: [
            {
                name: "Kill Idralax the All-Seeing",
                test: ["Combat"],
                success: { l: 1, e: 2 },
                failure: { l: -5, s: -2 }
            },
            {
                name: "[LO] Deep Speech / Undercommon: Alliance?",
                outcome: { e: -10, a: 1, ally: 'Idralax' }
            }
        ]
    },
    {
        type: 'opportunity',
        name: "A Potent Potion",
        id: 'quivicar-2',
        weight: 3,
        text: "That kobold has returned, this time claiming to be a powerful alchemist. Seems like a liar.",
        choices: [
            {
                name: "Buy the strongest potion",
                outcome: { e: -4 }
            },
            {
                name: "Buy some healing potions",
                outcome: { e: -2 }
            },
            {
                name: "Ugh, gross. Go away",
                outcome: { l: 1 }
            }
        ]
    },
    {
        type: 'threat',
        name: "A Grand Display!",
        id: "main-2",
        weight: 10,
        text: "The exhibit seems to be doing very well!",
        choices: [
            {
                name: "Fantastic!",
                outcome: { e: 5, l: 3, unlock: ['main-3']}
            }
        ]
    },
    {
        type: 'threat',
        name: "Our Nation, Cursed!",
        id: "main-3",
        weight: 10,
        text: "A wave crime and violence has washed over our lands! There is no clear explanation or connection between these different events. They seem to be happening at random.",
        choices: [
            {
                name: "There is nothing we can do",
                outcome: { s: -5, unlock: ['main-5'] }
            }, 
            {
                name: "Investigate it",
                test: ["DC 14 Arcana", "DC 14 Investigation", "DC 14 History"],
                success: { e: -3, s: -5, unlock: ['main-4'] },
                failure: { e: -3, s: -5, unlock: ['main-5'] }
            }
        ]
    },
    {
        type: 'threat',
        name: "Curse of the Reliquary",
        id: "main-4",
        weight: 8,
        text: "Our investigation has led us to the inescapable conclusion that the reliquary is cursed, and this curse is affecting our lands for some reason. We did some digging into the history of the artefact, and we've learned that it originated from somewhere in the Grey Desert.",
        choices: [
            {
                name: "Send a legion to investigate",
                outcome: { e: -2, m: -2, unlock: ['main-5', 'main-6'] }
            },
            {
                name: "Investigate it personally",
                test: ["DC 16 Survival", "DC 16 Perception", "DC 16 History"],
                success: { text: "???", unlock: ['main-5', 'main-6'] },
                failure: { text: "???", unlock: ['main-5'] }
            }
        ]
    }, {
        type: 'threat',
        name: "The Curse Grows!",
        id: "main-5",
        weight: 8,
        text: "Gold in our lands is turning to dust. Our warriors are growing weak and frail. Our people are getting more and more concerned!",
        choices: [
            {
                name: "We must remain steadfast",
                outcome: { e: -5, m: -5, unlock: ['main-7', 'main-8', 'main-9'] }
            }
        ]
    }, {
        type: 'threat',
        name: "The Menace of Sarkhet",
        id: "main-6",
        weight: 15,
        text: "Our expedition to the desert has revealed the origins of the reliquary - the final resting place of an ancient, powerful and tyrannical ruler known as Sarkhet Kha'Zul. The curse is clearly tied to it. We must be prepared.",
        choices: [
            {
                name: "Release emergency funding",
                outcome: { l: 5, m: 5, s: 5, e: -3 }
            },
            {
                name: "Pardon half of our criminals",
                outcome: { l: 5, m: 5, s: -3, e: 5 }
            },
            {
                name: "Declare martial law",
                outcome: { l: 5, m: -3, s: 5, e: 5 }
            },
            {
                name: "Rally the people",
                outcome: { l: -3, m: 5, s: 5, e: 5 }
            }
        ]
    }, {
        type: 'threat',
        name: "Our Nation Is Doomed!",
        id: "main-7",
        weight: 8,
        text: "Our wells yield bitter water! Our crops grow stunted and weak! The skies above our blessed cities are black with clouds! Petty arguments turn into fistfights without a second's thought!",
        choices: [
            {
                name: "There must be hope",
                outcome: { e: -5, m: -5, s: -6}
            }
        ]
    }, {
        type: 'threat',
        name: "Traitors Among Us!",
        id: "main-8",
        weight: 8,
        text: "Dozens of high ranking officials within our nation have emerged to be traitors to our state, working against us! When interrogated they all seem to say the same thing: 'He is coming for us...'",
        choices: [
            {
                name: "We can trust no one",
                outcome: { l: -10}
            }
        ]
    }, {
        type: 'threat',
        name: "The Whispers of Doom!",
        id: "main-9",
        weight: 8,
        text: "Those near the Reliquary swear they hear the sound of someone's voice telling them things. Telling them what they must do. They can't speak of what it is they must do - their faces turn deathly pale...",
        choices: [
            {
                name: "Lock it down",
                outcome: { l: -3, m: -3}
            }, {
                name: "Listen to the whispers",
                test: ["DC 20 Wisdom Save", "DC 16 History"],
                success: { l: -3, p: 2},
                failure: { l: -10, p: 1}
            }
        ]
    }
]






let mainDeck = [].concat(storyDeck, battleDeck, crisisDeck, opportunityDeck, dilemmaDeck)