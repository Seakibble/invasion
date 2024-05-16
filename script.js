// let music = new Howl({
//     src: ['music/title-card.mp3'],
//     volume: 0.5,
//     html5: true,
//     buffer: true,
//     loop: true
// })

let SFX = {
    milestone: new Howl({ src: ['audio/milestone.mp3'], volume: 0.5 }),
    phase: new Howl({ src: ['audio/phase.mp3'], volume: 0.5 }),
    
    flip: new Howl({ src: ['audio/cardFlip.mp3'], volume: 1 }),
    deal: new Howl({ src: ['audio/cardDeal.mp3'], volume: 1 }),
    
    good: new Howl({ src: ['audio/good.mp3'], volume: 1 }),
    bad: new Howl({ src: ['audio/bad.mp3'], volume: 1 }),
    great: new Howl({ src: ['audio/great.mp3'], volume: 1 }),
    disaster: new Howl({ src: ['audio/disaster.mp3'], volume: 1 }),
    neutral: new Howl({ src: ['audio/neutral.mp3'], volume: 1 }),
    ally: new Howl({ src: ['audio/ally.mp3'], volume: 1 }),
    
    doom1: new Howl({ src: ['audio/doom1.mp3'], volume: 0.5 }),
    doom2: new Howl({ src: ['audio/doom2.mp3'], volume: 0.5 }),
    doom3: new Howl({ src: ['audio/doom3.mp3'], volume: 0.5 }),
    doom4: new Howl({ src: ['audio/doom4.mp3'], volume: 0.5 }),
    
    rift: new Howl({ src: ['audio/rift.mp3'], volume: 0.5 }),
    threat: new Howl({ src: ['audio/threat.mp3'], volume: 0.3 }),
    battle: new Howl({ src: ['audio/battle.mp3'], volume: 0.5 }),

    intel: new Howl({ src: ['audio/intel.mp3'], volume: 1 }),
    prophecies: new Howl({ src: ['audio/portent.mp3'], volume: 0.3 }),

    drop: new Howl({ src: ['audio/drop.mp3'], volume: 1 }),

    drop1: new Howl({ src: ['audio/drop1.mp3'], volume: 1 }),
    drop2: new Howl({ src: ['audio/drop2.mp3'], volume: 1 }),
    drop3: new Howl({ src: ['audio/drop3.mp3'], volume: 1 }),

    action: new Howl({ src: ['audio/action.mp3'], volume: 1 }),
    start: new Howl({ src: ['audio/start.mp3'], volume: 1 }),

    defeat: new Howl({ src: ['audio/defeat.mp3'], volume: 1 }),
    victory: new Howl({ src: ['audio/victory.mp3'], volume: 1 }),
}


let dangerLevel = 0
function danger(stat, status) {
    if (status > 0) {
        if (!stat.parentElement.classList.contains('danger')) {
            stat.parentElement.classList.add('danger')
            dangerLevel++
            switch (dangerLevel) {
                case 1: SFX.doom1.play(); break
                case 2: SFX.doom2.play(); break
                case 3: SFX.doom3.play(); break
                case 4: defeat(); break
            }
        }
        if (status == 2) {
            stat.parentElement.classList.add('dangerBig')
        } else if (stat.parentElement.classList.contains('dangerBig')) {
            stat.parentElement.classList.remove('dangerBig')
        }
    } else if (stat.parentElement.classList.contains('danger')) {
        stat.parentElement.classList.remove('danger')
        if (stat.parentElement.classList.contains('dangerBig')) {
            stat.parentElement.classList.remove('dangerBig')
        }
        dangerLevel--
    }
}


function getType(type) {
    switch (type) {
        case 'crisis': return 'C'
        case 'dilemma': return 'D'
        case 'opportunity': return 'O'
        case 'battle': return 'B'
        case 'threat': return 'T'
        case 'rift': return 'AR'
        case 'dragon': return 'DR'
    }
}
function getChoice(choice) {
    let output = `
        <div class='choice'>
        <div class='choiceText'>${choice.name}</div>`
    if (choice.test) output += `<p class='check'>[TE] ${choice.test.join(" + ")}</p>`
    if (choice.outcome || choice.outcome === null) {
        output += makeOutcome(choice.outcome, null)
    } else {
        output += ` 
            ${makeOutcome(choice.success, true)}
            ${makeOutcome(choice.failure, false)}`
    }
    output += `</div>`
    return output
}


function makeOutcome(outcome, _type) {
    let text = []
    let effects = ''
    let type = ''
    if (_type === true) type = '[SU] | '
    if (_type === false) type = '[FA] | '

    if (outcome !== null) {
        if (outcome.s) {
            let pos = outcome.s > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.s + '&nbsp;[S]</span>')
            effects += ' data-s=' + outcome.s
        }
        if (outcome.l) {
            let pos = outcome.l > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.l + '&nbsp;[L]</span>')
            effects += ' data-l=' + outcome.l
        }
        if (outcome.m) {
            let pos = outcome.m > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.m + '&nbsp;[M]</span>')
            effects += ' data-m=' + outcome.m
        }
        if (outcome.r) {
            let pos = outcome.r > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.r + '&nbsp;[R]</span>')
            effects += ' data-r=' + outcome.r
        }
        if (outcome.a) {
            let pos = outcome.a > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.a + '&nbsp;[A]</span>')
            effects += ' data-a=' + outcome.a + ' data-ally="' + outcome.ally+'"'
        }
        if (outcome.e) {
            let pos = outcome.e > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.e + '&nbsp;[E]</span>')
            effects += ' data-t=' + outcome.e
        }
        if (outcome.i) {
            let pos = outcome.i > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.i + '&nbsp;[I]</span>')
            effects += ' data-i=' + outcome.i
        }
        if (outcome.p) {
            let pos = outcome.p > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.p + '&nbsp;[P]</span>')
            effects += ' data-p=' + outcome.p
        }
        if (outcome.unlock) {
            effects += ' data-unlock=' + JSON.stringify(outcome.unlock)
        }
        if (outcome.text) {
            text.push('<span class="plain">' + outcome.text + '</span>')
        }
        text = text.join('<span class="plain">,</span> ')
    } else {
        text = '<span class="plain"> No effect</span>'
    }

    return `
    <button class='outcome' ${effects}><b class='${type.toLowerCase()}'>${type}</b> ${text}</button>
    `
}



function drawCard(index, deck) {
    let event = deck[index]
    console.log(deck)
    if (!event) {
        alert("out of events")
        return
    }
    deck.splice(index, 1)

    $nextTurn.disabled = true
    return makeEvent(event)
}

let eventID = 0
let activeEvents = 0
function makeEvent(event) {
    console.log(event.name)
    eventID++
    activeEvents++

    let text = `    
    <div id='event-${eventID}' class='card wrapper'>
        <div class='cardBox ${event.type} ${event.chain}'>
            <div class='content'>`

    let art = 'cardBack'
    if (event.art) art = event.art
    else if (event.type) art = event.type

    text += `<div class='cardArt' style="background-image: url('art/${art}.png')"></div>`
    text += `<h2>[${getType(event.type)}] ${event.name}</h2><div class='stuff'>
                <div class='eventText'><p>${event.text}</p></div>`
    if (event.choices) {
        text += `<div class='choices'> ${getChoice(event.choices[0])}`
        if (event.choices.length > 1) {
            for (let i = 1; i < event.choices.length; i++) {
                // text += `<div class='or'>— OR —</div>`
                text += `${getChoice(event.choices[i])}`
            }
        }
    }
    text += `</div></div></div></div></div>`
    return text
}

let lowStatText = `<p>At the end of the month, any negative stats will degrade by 1. If all stats are negative at the end of the month, the hold will be lost.</p>`
let gameOverText = `<p>If a stat is -10 or lower, then <i>all</i> stats degrade by 1 at the end of the month.</p>`

let text = `
<div id='endscreen' class='endscreen hide'>
    <div id='victory' class='welcome__box'>
        <h2>Victory!</h2>
        <p>You have defeated the trials of the year. The road ahead will not be easy, but you have no doubt that you are soon to enter a golden age in the glorious history of New Anvilhold!</p>
    </div>
    <div id='defeat' class='welcome__box'>
        <h2>Defeat!</h2>
        <p>The hold has fallen! Though you tried as hard as you could, it was not enough to prevail. May the Gods show us mercy!</p>
    </div>
</div>
<div id="welcome" class="welcome">
    <div id='slide1' class="welcome__box">
            <h2>Welcome New Anvilhold!</h2>
            <p>Fifty years ago, a group of heroes ventured into an ancient, orc-infested abandoned Dwarven mountain fortress called <b>Anvilhold</b>. They cleared it out, waging war on the orcs there. Ultimately, they killed the orcs' leader (a monster of a warrior called <b>Galmog the Even Greater</b>), and reclaimed the fortress.</p>
            <p>People (particularly dwarves for obvious reasons, but from all walks of life) flocked to this bastion and civilization returned to the once-lawless lands surrounding them. And so the free and mighty independent state of <b>New Anvilhold</b> began!</p>
            <p>You, the original adventurers that liberated the dwarven hold, now serve as the chief advisors to the Sovereign, a young dwarf called <b>Kalgar Steeljaw I</b>. He trusts you implicitly, and his inexperience leads him to defer to your judgement in most cases.</p>
            <p>Though New Anvilhold has prospered, some unknown dark event looms on the horizon, a grave threat to this promising new land...</p>
            <button id="nextSlide" class='action'>Next</button>
            <button id="beginAdventure2" class='action'>Skip Tutorial</button>
    </div>
    <div id='slide2' class="welcome__box hide">
        <h2>Status of the Hold</h2>
        <p>As the ruling council of New Anvilhold, it will be your responsibility to keep the hold running for the next year.</p>

        <p>You will need to make decisions in the best interest of the kingdom. The status of New Anvilhold is measured with four stats: [S] <b>Stability</b>, [L] <b>Loyalty</b>, [E] <b>Economy</b>, and [M] <b>Military</b>. You will need to balance each of these factors to survive the trials to come.</p>
        <p>At the end of each month, any negative stats degrade by 1. Any stats at -10 or lower degrate all other stats too! Avoid letting stats sit in the negative for too long, or you might struggle to fix the problem!</p>
        <p>As long as the month ends with a single stat that isn't negative, the hold will endure. But if the month ends with all stats in the negative, then you will lose...</p>
        <button id="nextSlide2" class='action'>Next</button>
    </div>
    <div id='slide3' class="welcome__box hide">
        <h2>Resting</h2>
        <p>This adventure takes a very abstract approach to resting. You will not have the opportunity to take a long rest. Towards the end, you may be able to take a short rest. Spend your resources wisely!</p>
        <button id="nextSlide3" class='action'>Next</button>
    </div>
    <div id='slide4' class="welcome__box hide">
        <h2>Events</h2>
        <p>Each month, three <b>events</b> will occur. They can be resolved in any order. Once all events are resolved, you can advance to the next month. Events are resolved by making a <b>Decision</b>. Some decisions succeed automatically, but others may require a check using one of the kingdom's stats, or an ability check or attack roll using a council member.</p>
        <p>If an ability check or attack roll is required, a member of the council must be present. Council members can each respond to one event. Mutliple council members can respond to a single event, which may be necessary if there's a lot riding on a favourable outcome.</p>
        <p>There are five types of events:</p>
        <ul>
            <li>[C] <b>Crises:</b> These are usually bad. The best you can usually hope for is good damage control.</li>
            <li>[O] <b>Opportunities:</b> These are usually good, and rarely have negative effects.</li>
            <li>[D] <b>Dilemmas:</b> These can go either way, depending on the decision you make and your effectiveness.</li>
            <li>[B] <b>Battles:</b> These usually require the council to engage in combat personally.</li>
            <li>[SP] <b>Special:</b> These vary in nature, and represent particular storylines or themed events.</li>
        </ul>
        <button id="nextSlide4" class='action'>Next</button>
    </div>
    <div id='slide5' class='welcome__box hide'>
        <h2>Special Resources</h2>
        <p>In dealing with events, you may also gain access to some special resources:</p>
        <ul>
            <li>[P] <b>Prophecies:</b> Visions of the future that will ensure victory. Spend to get a natural 20 on a roll.</li>
            <li>[I] <b>Intel:</b> Information that can be used to reduce the DC of rolls by 3.</li>
            <li>[R] <b>Relics:</b> Powerful artefacts that will help you at the end of the year.</li>
            <li>[A] <b>Allies:</b> Friends who will help you at the end of the year.</li>
        </ul>
        <p>Manage these resources carefully, as they will be vital to your success.</p>
        <p>May the Gods of Stone watch over you.</p>
        <button id="beginAdventure" class='action'>Begin the adventure...</button>
    </div>
</div>
<div class='container'>    
    <div class='time'>
        <h1>The Year of Curses</h1>
        <div class='timeBar'>
            <div id='timeBar' class='timeBarInner'></div>
            <div class='timeBarPip'>I</div><div class='timeBarPip'>II</div><div class='timeBarPip'>III</div><div class='timeBarPip'>IV</div>
            <div class='timeBarPip'>V</div><div class='timeBarPip'>VI</div><div class='timeBarPip'>VII</div><div class='timeBarPip'>VIII</div>
            <div class='timeBarPip'>IX</div><div class='timeBarPip'>X</div><div class='timeBarPip'>XI</div><div class='timeBarPip'>XII</div>
            <span class='skull'>💀</span>
        </div>
    </div>

    <div class='sidebar'>
        <div id='stats' class='stats'>
            <div class='stat heading'><span class='seperator'></span>THE KINGDOM <span class='seperator'></span> </div>

            <div class='stat heading'>STATUS</div>
            <div class='stat'><div>[S]</div><div>Stability</div><span id='stability'></span>
                <div class='toolTip'>
                    <div>This represents the infrastructure and morale of New Anvilhold.
                        ${lowStatText}
                        ${gameOverText}
                    </div>
                </div>
            </div>
            <div class='stat'><div>[L]</div><div>Loyalty</div><span id='loyalty'></span>
                <div class='toolTip'>
                    <div>This represents how dedicated the people of New Anvilhold are to your leadership.
                        ${lowStatText}
                        ${gameOverText}
                    </div>
                </div>
            </div>
            <div class='stat'><div>[E]</div><div>Economy</div><span id='economy'></span>
                <div class='toolTip'>
                    <div>This represents New Anvilhold's wealth and resources. 
                        ${lowStatText}
                        ${gameOverText}
                    </div>
                </div>
            </div>
            <div class='stat'><div>[M]</div><div>Military</div><span id='military'></span>
                <div class='toolTip'>
                    <div>This represents New Anvilhold's armed forces and combat capability.
                        ${lowStatText}
                        ${gameOverText}
                    </div>
                </div>
            </div>
            
            <div class='stat heading'>RESOURCES</div>

            <div class='stat'><div>[P]</div><div>Prophecies</div><span id='prophecies'></span>
                <div class='toolTip'>
                    <div>Invoke a prophecy before making a roll to get a natural 20 and automatically succeed!
                        <button id="spendProphecies" class="spend">[P] Invoke Prophecy</button>
                    </div>
                </div>
            </div>
            <div class='stat'><div>[I]</div><div>Intel</div><span id='intel'></span>
                <div class='toolTip'>
                    <div>Intel can be used to reduce the DC of a roll by 3. You can spend multiple points of Intel at a time, and you can do it after rolling. <br>
                        <button id="spendIntel" class="spend">[I] Cash in Intel</button>
                    </div>
                </div>
            </div>
            <div class='stat'><div>[R]</div><div>Relics</div><span id='relics'></span>
                <div class='toolTip'>
                    <div>Relics can be redeemed for magic items!</div>
                </div>
            </div>
            <div class='stat'><div>[A]</div><div>Allies</div><span id='allies'></span>
                <ul id='alliesList' class='alliesList'></ul>
                <div class='toolTip'>
                    <div>Allies will come to your aid in the final battle at the end of the year!</div>
                </div>
            </div>
        </div>

        <button id="nextTurn" class='endTurn'>[H] Advance Calendar</button>
    </div>

    <div id='events' class='events'></div>
</div>
`

function iconSwitch(text) {
    text = text.replaceAll('[S]', '<span class="icon">⚖️</span>') // Stability
    text = text.replaceAll('[L]', '<span class="icon">❤️</span>') // Loyalty
    text = text.replaceAll('[E]', '<span class="icon">💎</span>') // Economy
    text = text.replaceAll('[M]', '<span class="icon">🛡️</span>') // Military

    text = text.replaceAll('[I]', '<span class="icon">🔍</span>') // Intel
    text = text.replaceAll('[A]', '<span class="icon">🤝</span>') // Allies
    text = text.replaceAll('[R]', '<span class="icon">🔮</span>') // Relics
    text = text.replaceAll('[P]', '<span class="icon">👁️</span>') // Prophecies

    text = text.replaceAll('[AR]', '<span class="icon">🌌</span>') // Astral Rift
    text = text.replaceAll('[DR]', '<span class="icon">🐲</span>') // Dragon
    text = text.replaceAll('[C]', '<span class="icon">💥</span>') // Crisis
    text = text.replaceAll('[O]', '<span class="icon">🌠</span>') // Opportunity
    text = text.replaceAll('[D]', '<span class="icon">❓</span>') // Dilemma
    text = text.replaceAll('[B]', '<span class="icon">⚔️</span>') // Battle
    text = text.replaceAll('[T]', '<span class="icon">💀</span>') // Threat

    text = text.replaceAll('[TE]', '<span class="icon">🎲</span>') // Test
    text = text.replaceAll('[SU]', '<span class="icon">✔️</span>') // Success
    text = text.replaceAll('[FA]', '<span class="icon">❌</span>') // Failure
    text = text.replaceAll('[LO]', '<span class="icon">🔒</span>') // Locked
    text = text.replaceAll('[SP]', '<span class="icon">⭐️</span>') // Special
    
    text = text.replaceAll('[H]', '<span class="icon hourglass">⌛️</span>') // Hourglass

    text = text.replaceAll('//', '</p><p>') // New Paragraph

    return text
}


document.body.innerHTML = iconSwitch(text)

let victoryState = null
let $endscreen = document.getElementById('endscreen')
let $victory = document.getElementById('victory')
let $defeat = document.getElementById('defeat')

function victory() {
    $defeat.remove()
    victoryState = true
    $endscreen.style.display = 'grid'
    setTimeout(() => {
        $endscreen.classList.remove('hide')
        SFX.victory.play()
    }, 250)
    
}
function defeat() {
    $victory.remove()
    victoryState = false
    $endscreen.style.display = 'grid'
    setTimeout(() => {
        $endscreen.classList.remove('hide')
        SFX.defeat.play()
    }, 250)
    
}


let $beginAdventure = document.getElementById('beginAdventure')
let $beginAdventure2 = document.getElementById('beginAdventure2')
let $welcome = document.getElementById('welcome')
$beginAdventure.addEventListener('click', (e) => {
    SFX.start.play()
    $welcome.classList.add('hide')
    setTimeout(() => {$welcome.remove()}, 1000)
})
$beginAdventure2.addEventListener('click', (e) => {
    SFX.start.play()
    $welcome.classList.add('hide')
    setTimeout(() => { $welcome.remove() }, 1000)
})

let $slide1 = document.getElementById('slide1')
let $slide2 = document.getElementById('slide2')
let $slide3 = document.getElementById('slide3')
let $slide4 = document.getElementById('slide4')
let $slide5 = document.getElementById('slide5')
let $nextSlide = document.getElementById('nextSlide')
let $nextSlide2 = document.getElementById('nextSlide2')
let $nextSlide3 = document.getElementById('nextSlide3')
let $nextSlide4 = document.getElementById('nextSlide4')
$nextSlide.addEventListener('click', (e) => {
    SFX.action.play()
    $slide1.classList.add('hide')
    setTimeout(() => {
        $slide2.style.display = 'block'
        setTimeout(() => { $slide2.classList.remove('hide') }, 10)
        $slide1.remove()
    }, 500)
})
$nextSlide2.addEventListener('click', (e) => {
    SFX.action.play()
    $slide2.classList.add('hide')
    setTimeout(() => {
        $slide3.style.display = 'block'
        setTimeout(() => { $slide3.classList.remove('hide') }, 10)
        $slide2.remove()
    }, 500)
})
$nextSlide3.addEventListener('click', (e) => {
    SFX.action.play()
    $slide3.classList.add('hide')
    setTimeout(() => {
        $slide4.style.display = 'block'
        setTimeout(() => { $slide4.classList.remove('hide') }, 10)
        $slide3.remove()
    }, 500)
})
$nextSlide4.addEventListener('click', (e) => {
    SFX.action.play()
    $slide4.classList.add('hide')
    setTimeout(() => {
        $slide5.style.display = 'block'
        setTimeout(() => { $slide5.classList.remove('hide') }, 10)
        $slide4.remove()
    }, 500)
})

let $events = document.getElementById('events')
let $nextTurn = document.getElementById('nextTurn')
let $spendIntel = document.getElementById('spendIntel')
let $spendProphecies = document.getElementById('spendProphecies')

let stability = 9
let loyalty = 6
let economy = 5
let military = 7
let intel = 0
let allies = 0
let relics = 0
let prophecies = 0

let $stability = document.getElementById('stability')
let $loyalty = document.getElementById('loyalty')
let $intel = document.getElementById('intel')
let $military = document.getElementById('military')

let $economy = document.getElementById('economy')
let $allies = document.getElementById('allies')
let $alliesList = document.getElementById('alliesList')
let $relics = document.getElementById('relics')
let $prophecies = document.getElementById('prophecies')

statChange('stability', 0)
statChange('loyalty', 0)
statChange('economy', 0)
statChange('military', 0)
statChange('intel', 0)
statChange('allies', 0)
statChange('relics', 0)
statChange('prophecies', 0)

$spendIntel.addEventListener('click', (e) => {
    if (intel > 0) {
        SFX.intel.play()
        statChange('intel', -1)
    }
})

$spendProphecies.addEventListener('click', (e) => {
    if (prophecies > 0) {
        SFX.prophecies.play()
        statChange('prophecies', -1)
    }
})



$events.addEventListener('click', (e) => {
    let btn = e.target.closest('.outcome')
    if (btn && btn.classList.contains('outcome')) {
        activeEvents--
        if (activeEvents == 0 && month == 12 && victoryState === null) victory()

        if (activeEvents == 0) $nextTurn.disabled = false

        if (btn.dataset.s) statChange('stability', btn.dataset.s)
        if (btn.dataset.l) statChange('loyalty', btn.dataset.l)
        if (btn.dataset.i) statChange('intel', btn.dataset.i)
        if (btn.dataset.m) statChange('military', btn.dataset.m)
        if (btn.dataset.t) statChange('economy', btn.dataset.t)
        if (btn.dataset.a) {
            statChange('allies', btn.dataset.a, btn.dataset.ally)
        }
        if (btn.dataset.r) statChange('relics', btn.dataset.r)
        if (btn.dataset.p) statChange('prophecies', btn.dataset.p)

        let good = false
        let bad = false
        let sum = 0
        if (btn.dataset.s) sum += parseInt(btn.dataset.s)
        if (btn.dataset.l) sum += parseInt(btn.dataset.l)
        if (btn.dataset.i) sum += parseInt(btn.dataset.i)
        if (btn.dataset.m) sum += parseInt(btn.dataset.m)
        if (btn.dataset.t) sum += parseInt(btn.dataset.t)
        if (btn.dataset.a) sum += parseInt(btn.dataset.a)
        if (btn.dataset.r) sum += parseInt(btn.dataset.r)
        if (btn.dataset.p) sum += parseInt(btn.dataset.p)
        
        if (btn.dataset.s > 0
            || btn.dataset.l > 0
            || btn.dataset.i > 0
            || btn.dataset.m > 0
            || btn.dataset.t > 0
            || btn.dataset.a > 0
            || btn.dataset.r > 0
            || btn.dataset.p > 0) good = true
        if (btn.dataset.s < 0
            || btn.dataset.l < 0
            || btn.dataset.i < 0
            || btn.dataset.m < 0
            || btn.dataset.t < 0
            || btn.dataset.a < 0
            || btn.dataset.r < 0
            || btn.dataset.p < 0) bad = true
        
        console.log(sum)
        if (btn.dataset.ally) SFX.ally.play()
        else if (sum >= 5) SFX.great.play()
        else if (sum <= -5) SFX.disaster.play()
        else if (good && !bad) SFX.good.play()
        else if (bad && !good) SFX.bad.play()
        else SFX.neutral.play()

        let unlock = btn.dataset.unlock
        if (unlock) {
            unlock = JSON.parse(unlock)
            if (Array.isArray(unlock)) {
                unlock.forEach((lockedEvent) => {
                    console.log(lockedEvent)
                    let event = locked.find((card) => card.id == lockedEvent)
                    console.log(event)
                    if (event) mainDeck.push(event)
                })
            }
        }

        let card = btn.closest('.card')
        if (card && card.classList.contains('show')) {
            card.classList.remove('show')
            card.classList.add('hide')
            // card.classList.add('shrink')
            setTimeout(() => {
                card.classList.add('shrink')
                // card.classList.remove('hide')                
            }, 750)
            setTimeout(() => {
                card.remove()
            }, 1500)
        }
    }
})

$events.addEventListener('click', (e) => {
    let card = e.target.closest('.cardBox')
    if (card && card.classList.contains('cardBox')) {
        if (!card.classList.contains('flip')) {
            SFX.flip.play()
            if (card.classList.contains('rift')) SFX.rift.play()
            else if (card.classList.contains('threat')) SFX.threat.play()
            else if (card.classList.contains('battle')) SFX.battle.play()
            
            card.classList.add('flip')
            setTimeout(() => {
                let art = card.getElementsByClassName('cardArt')[0]
                if (art) art.style.display = 'none'
            }, 200);
        }
    }
})

function statState(stat) {
    if (stat > 9) return 'high'
    else if (stat > 5) return 'medium'
    else if (stat >= 0) return 'low'
    else if (stat > -10) return 'critical'
    else return 'failed'
}

function getPos(x) {
    if (x >= 0) return '+' + x
    else return x
}

function statChange(stat, amount, ally) {
    amount = parseInt(amount)
    let x = 0
    switch (stat) {
        case 'stability':
            stability += amount
            $stability.innerHTML = `<span class="number ${statState(stability)}">` + getPos(stability) + '</span>'
            if (stability <= -10) x = 2
            else if (stability < 0) x = 1
            danger($stability, x)
            break
        case 'loyalty':
            loyalty += amount
            $loyalty.innerHTML = `<span class="number ${statState(loyalty)}">` + getPos(loyalty) + '</span>'
            if (loyalty <= -10) x = 2
            else if (loyalty < 0) x = 1
            danger($loyalty, x)
            break
        case 'economy':
            economy += amount
            $economy.innerHTML = `<span class="number ${statState(economy)}">` + getPos(economy) + '</span>'
            if (economy <= -10) x = 2
            else if (economy < 0) x = 1
            danger($economy, x)
            break
        case 'military':
            military += amount
            $military.innerHTML = `<span class="number ${statState(military)}">` + getPos(military) + '</span>'
            if (military <= -10) x = 2
            else if (military < 0) x = 1
            danger($military, x)
            break
        case 'intel':
            intel += amount
            $intel.innerHTML = '<span class="number">' + intel + '</span>'
            break
        case 'allies':
            allies += amount
            $allies.innerHTML = '<span class="number">' + allies + '</span>'
            if (ally) {
                let $ally = document.createElement('li')
                $ally.textContent = ally
                $alliesList.appendChild($ally)
            }
            break
        case 'relics':
            relics += amount
            $relics.innerHTML = '<span class="number">' + relics + '</span>'
            break
        case 'prophecies':
            prophecies += amount
            $prophecies.innerHTML = '<span class="number">' + prophecies + '</span>'
            break
    }
}

function dropStat(stat, i) {
    setTimeout(() => {
        statChange(stat, -1)
        if (i == 1) SFX.drop1.play()
        else if (i == 2) SFX.drop2.play()
        else if (i == 3) SFX.drop3.play()
    }, (2 - i) * 333)
}

$timeBar = document.getElementById('timeBar')
function nextMonth() {
    month++
    $timeBar.style.width = (month / 12 * 100) + '%'
    let timeout = 1000
    if (month == 0) timeout = 0

    let i = 0
    if (stability <= -10) {
        statChange('stability', -1)
        statChange('loyalty', -1)
        statChange('economy', -1)
        statChange('military', -1)
        i++
    } else if (stability < 0) {
        statChange('stability', -1)
        i++
    } 
    if (loyalty <= -10) {
        statChange('stability', -1)
        statChange('loyalty', -1)
        statChange('economy', -1)
        statChange('military', -1)
        i++
    } else if (loyalty < 0) {
        statChange('loyalty', -1)
        i++
    } 
    if (economy <= -10) {
        statChange('stability', -1)
        statChange('loyalty', -1)
        statChange('economy', -1)
        statChange('military', -1)
        i++
    } else if (economy < 0) {
        statChange('economy', -1)
        i++
    } 
    if (military <= -10) {
        statChange('stability', -1)
        statChange('loyalty', -1)
        statChange('economy', -1)
        statChange('military', -1)
        i++
    } else if (military < 0) {
        statChange('military', -1)
        i++
    } 

    if (i > 0) SFX.drop.play()
    // switch (i) {
    //     case 3: setTimeout(() => SFX.drop3.play(), 800)
    //     case 2: setTimeout(() => SFX.drop3.play(), 400)
    //     case 1: SFX.drop1.play()
    // }


    setTimeout(() => {
        if (victoryState === false) return
        
        if (month == 8) {
            mainDeck = mainDeck.concat(lategameDeck)
        }
        if (month == 12) { // Final Battle
            dealCards(1, endgameDeck)
        } else {
            dealCards(3, mainDeck)
        }
        if (month > 11) $timeBar.parentElement.classList.add('phase5')
        else if (month > 8) $timeBar.parentElement.classList.add('phase4')
        else if (month > 5) $timeBar.parentElement.classList.add('phase3')
        else if (month > 2) $timeBar.parentElement.classList.add('phase2')
    }, timeout)
}

let month = 0
$nextTurn.addEventListener('click', () => {
    nextMonth()
    SFX.milestone.play()
})


function dealCards(number, deck) {
    let newEvents = []

    for (let i = 0; i < number; i++) {
        let proxyDeck = getProxyDeck(deck)

        let proxyIndex = Math.floor(Math.random() * proxyDeck.length)
        let index = proxyDeck[proxyIndex]
        $events.innerHTML += iconSwitch(drawCard(index, deck))
        newEvents.push(eventID)
    }
    for (let i = 0; i < newEvents.length; i++) {
        setTimeout(() => {
            document.getElementById('event-' + newEvents[i]).classList.add('show')
            SFX.deal.play()
        }, 350 * i)
    }
}

function getProxyDeck(deck) {
    let proxyDeck = []
    for (let i = 0; i < deck.length; i++) {
        let event = deck[i]
        let weight = 1
        if (event.weight) weight = event.weight

        for (let j = 0; j < weight; j++) proxyDeck.push(i)
    }
    return proxyDeck
}

