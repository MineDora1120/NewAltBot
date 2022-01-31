console.log("스크립트를 읽는중...")
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const infopath = `./package.json`;
const info = JSON.parse(fs.readFileSync(infopath, "utf-8"));
//const path = require('path')
const ytdl = require('ytdl-core');
const dev = "true" //테스트 서버 사용, true 사용 하지 않음 false
const request = require('request')
const mdlog = "https://static.wixstatic.com/media/bcc14d_14c8ed70b93447c6acda2a536bdaac78~mv2.jpg/v1/fill/w_134,h_134,al_c,q_80,usm_0.66_1.00_0.01/images.webp"
const img = "https://static.wixstatic.com/media/bcc14d_3e3c3489f7dd45759fc0d6b01fe1a270~mv2.jpg/v1/fill/w_339,h_313,al_c,q_80,usm_0.66_1.00_0.01/KakaoTalk_20210804_170059173.webp"
const boturi = "https://mydodo1120.wixsite.com/mdsoft/home"
const token = "ODA0MzExNTMwNTE4MzQ3ODI2.YBKffA.ON02VbKEAi4Y6zJZU1umVSZD768"
const devtoken = "NjgwMDM0ODY0MzMzODQ4NTkz.Xk6B0g.Aa2GGw7xASYMu3CiSCqCpQ5fw6U"
//const Youtube = require('youtube-node');
const yts = require('yt-search')
const { release } = require('os');
//const { url } = require('inspector');
const youtube = new Youtube();
//YouTube Data API v3 개인key값
youtube.setKey("AIzaSyCNnMvLcoWfHhnsIXF2LtIBHYpJylhv7iY");

//음악 관련 오류 명령어

const joinerr = new Discord.MessageEmbed() 
joinerr.setColor("#d9534f")
joinerr.setAuthor("알트 봇", img)
joinerr.setTitle("음성 채널 입장")
joinerr.setDescription("먼저, 음성 채널에 입장해 주세요!")
joinerr.setTimestamp()
joinerr.setFooter('MD BOT',mdlog)

const skiperr = new Discord.MessageEmbed()
skiperr.setColor("#d9534f")
skiperr.setAuthor("알트 봇", img)
skiperr.setTitle("스킵 오류")
skiperr.setDescription("스킵 할 수 있는 음악이 없어요.")
skiperr.setTimestamp()
skiperr.setFooter('MD BOT',mdlog)

const stoperr = new Discord.MessageEmbed()
stoperr.setColor("#d9534f")
stoperr.setAuthor("알트 봇", img)
stoperr.setTitle("정지 오류")
stoperr.setDescription("정지 할 수 있는 음악이 없어요.")
stoperr.setTimestamp()
stoperr.setFooter('MD BOT',mdlog)

const listerr = new Discord.MessageEmbed()
listerr.setColor("#d9534f")
listerr.setAuthor("알트 봇", img)
listerr.setTitle("목록 표시 오류")
listerr.setDescription("아직 대기열에 있는 음악을 감지하지 못했어요.")
listerr.setTimestamp()
listerr.setFooter('MD BOT',mdlog)

//API 오류 명령어
let apierr = new Discord.MessageEmbed()
.setColor("#d9534f")
.setAuthor("알트 봇", img)
.setTitle("불러오기 실패")
.setDescription("알 수 없는 오류가 발생했어요") 
.setTimestamp()
.setFooter('MD BOT',mdlog)

//릴리즈
const releases = new Discord.MessageEmbed()
releases.setColor("#9acd32")
releases.setAuthor("알트 봇", img)
releases.setTitle("현재 릴리즈")
releases.setThumbnail("https://media.discordapp.net/attachments/730055025824628748/937663826004947054/KakaoTalk_20220123_121521490.jpg?width=671&height=671")
releases.addField("Version", "0.9.2-dev", true)
releases.addField("discord.js", "12.5.4", true)
releases.addField("node.js", "6.14.15", true)
releases.addField("ytdl-core", "4.10.0", true)
releases.addField("opusscript", "0.0.7", true)
releases.addField("ffmpeg-static", "4.0.0", true)
if(dev == "false") {
releases.setDescription("이 알트봇 시스템은 Public 버전입니다.")
} else {
  releases.setDescription("이 알트봇 시스템은 Dev 버전입니다. 불안정할 수 있습니다.")
  message.reply("이 버전을 사용하는건 개발자가 아니면 매우 위험합니다. 모든 오류의 책임은 본인에게 있습니다.")
releases.setTimestamp()
releases.setFooter('MD BOT',mdlog)
}
     
//가위바위보 관련 명령어

const convertEmoji = (who) => {
  if(who === "가위" || who === "찌"){
    return "🤘";
  }
  else if(who === "바위" || who === "묵"){
    return "👊";
  }
  else if(who === "보" || who === "빠"){
    return "✋";
  }
}


client.on('ready', () => {
   console.log('SUCCESS!');
    console.log(`알트 봇 리소스가 ${client.user.tag}로 로드 되었습니다.`)
    console.log("개발 버전을 사용하시려면 ./dev/start.ps1을 실행하세요.")
    if(dev == "false") {
      console.log("Public 버전을 테스트 서버에서 사용하실려면 Dev 변수를 true로 변경하세요.")
    } else {
      console.log("Public 버전을 테스트 서버에서 사용하지 않을려면 Dev 변수를 false로 변경하세요.")
    }
    client.user.setActivity("에엑따", { type: 'PLAYING'});
  });

client.on("message", (message) => {
  if(message.author.bot) return;
  if(message.channel.type == 'dm') {
    message.channel.send("DM에서는 알트봇을 사용할 수 없어요");
    return;
  }
  if(message.author.id === client.user.id) return;
  if(message.guild.id == "728441087668256780"){
   if(dev == "false") {
     return;
   }
  } 

if(message.content.startsWith("알트야 도움")) {
 message.member.user.send(`
 __** 💾 알트 봇 명령어:**__

  ** > 음악 관련 명령어 **
  - 알트야 재생 (제목) - 알트가 음성채널에 들어와 검색된 음악을 재생해요.
  - 알트야 멈춰 - 알트가 음악을 멈추고, 대기열을 초기화해요.
  - 알트야 스킵 - 알트가 지금 재생중인 음악을 스킵하고, 다음 대기열의 음악을 재생해요!
  - 알트야 목록 - 알트가 음악 대기열을 표시해요.
  - 알트야 노레방 (제목) - 알트가 이 제목의 MR을 검색해 MR을 재생해요. (이 기능은 정확이 되지 않을 수 있어요!)
 
  ** > 게임&잡기능 관련 명령어 **
  - 알트야 자판기 - 알트가 랜덤적으로 음료수를 뽑아요. (결제 : 500원)
  - 알트야 복권 - 0.01% 확률로 당첨되는 알트 봇의 도배(?) 기능이에요. (결제 : 1000원)
  - 알트야 로또 (반호) - 랜덤적으로 나오는 번호를 맞춰 성공하는 게임이에요. (결제 : 1000원)
  - 알트야 (내용) - 가위, 바위, 보 중 하나를 선택해 저를 이겨보세요. 이기면 소량의 돈을 드려요! (송금 : 1000원)

 ** > 이코노미(돈) 관련 명령어 **
  - 알트야 돈내놔 - 가끔식 알트가 돈을 주는 명령어에요. 사용방법은 직접 습득해보세요!
  - 알트야 잔액 - 현재 계좌에 남아있는 돈을 주는 명령어에요
  - 알트야 지갑 - 현재 사용중인 계좌 정보를 표시해요.
  - 알트야 등록 - 계좌를 생성하고, 돈을 랜덤적으로 추가해요.
  [ 활동을 많이 하면 돈을 얻을 수 있어요 ! ]

  **> 서버 관리 명령어 **
  - 알트야 추방 (@player) - 언급한 플레이어를 추방하실 수 있어요.
  - 알트야 차단 (@player) - 언급한 플레이어를 차단하실 수 있어요.
  - 알트야 투표 (내용) - 입력한 내용으로 투표를 받아요.
  - 알트야 청소 (숫자) - (숫자) 만큼 입력한 매시지를 삭제해요.

  **> API(정보) 명령어 **
  - 알트야 온도/한강온도 - 한강 온도를 표시해요.
  - 알트야 링크축약 (URI) - (URI)를 네이버 링크로 축약해요. 이 기능은 불안정해요.
  - 알트야 코로나 - 현재 코로나의 상황/감염자 수를 표시해요.

  ** > 알트봇 릴리즈 정보 명령어 **
  - 알트야 릴리즈 - 현재 릴리즈 정보를 표시해요.
  - 알트야 개발자 - 마도#8614에요.
 `).catch(console.error); 
 message.channel.send("✅ DM을 확인해 주세요!")
    } else if (message.content.startsWith("알트야 청소")) {
      if(message.member.hasPermission("MANAGE_CHANNELS")) {
        
      const args = message.content.slice('알트야 청소 '.length) // All arguments behind the command name with the prefix
      var isNum = !isNaN(args)

     if(isNum && (args <= 0 || 100 < args)) {
      message.channel.send("1부터 100까지의 숫자를 입력해 주세요!")
      return;
    } else {
      message.channel.messages.fetch({ imit: args }).then(dmessage => { // Fetches the messages
      message.channel.bulkDelete(dmessage // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      
      ).catch(console.log);});
      let em = new Discord.MessageEmbed()
     .setColor("#13ad65")
     .setAuthor("알트 봇", img)
     .setTitle("청소 성공")
     .setDescription(`총 ${args}만큼의 매시지를 제거했어요.`)
     .setTimestamp()
     .setFooter('MD BOT',mdlog)

     message.channel.send(em)
    }
      } else {
        let embed = new Discord.MessageEmbed()
           .setColor('#dc143c')
           .setAuthor("알트 봇", img)
           .setTitle('청소 실패')
           .setDescription(`${message.author.username}님은 청소를 할 수 있는 권한이 없어요.`)
           .setFooter('MD BOT',mdlog)
           .setTimestamp();
   
           message.channel.send(embed)
      }
    } else if (message.content.includes('알트야 자판기')) {
        const id = message.author.id;
        const name = message.author.username;

        const filePath = `./userdata/${id}.json`;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
  //console.log(message.author.id + "님이 자판기 로드") //debutging
  let japangi = (Math.floor((Math.random() * 13) + 1))
  //console.log(japangi); //debuging
  if(user.id) {
    if(user.money >= 500) {
      saveUser = {
        id,
        name,
        date,
        money : user.money - 500,
       } 
       fs.writeFileSync(filePath, JSON.stringify(saveUser));
  if(japangi == "1") {
    message.channel.send("http://img.danawa.com/prod_img/500000/722/205/img/2205722_1.jpg?shrink=360:360&_v=20180115153627")
    let em = new Discord.MessageEmbed()
   // .setTitle('')
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("울트라 슈퍼 릭플렉터 하이퍼 메가 킹시", "가 자판기를 뒤적거리다 나왔어요!")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "2") {
    message.channel.send("http://img.danawa.com/prod_img/500000/251/631/img/7631251_1.jpg?shrink=360:360&_v=20200511163323")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("종이컵", "이 자판기에서 떨어졌어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "3") {
    message.channel.send("https://cdn.emetro.co.kr/data2/content/image/2020/07/23/.cache/512/20200723500395.jpg")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("2000프로", "가 하늘로 쏫구치다 떨어졌어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "4") {
    message.channel.send("https://w.namu.la/s/cf5caec5c5f6d9fa6920a8a129f1ab54edd490bdd42ee359ac1a975f1f0d887546035e4307a1a0002825fe0ba56b459373d3ba49dcc6c745b022c0b22726d819fccccaa662dc764be7d8a4380b14532c58fafdd56c2f20188a5cf8540da12ce4")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("10성 쌓여있던 탄산 사이다", "가 탄산으로 날아가려다가 굴러 떨어졌어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "5") {
    message.channel.send("http://img.danawa.com/prod_img/500000/582/205/img/2205582_1.jpg?shrink=360:360&_v=20170420120414")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("트로피 에엑따", "가 트로피를 보고 자판기에서 떨어졌어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "6") {
    message.channel.send("https://josundal.com/web/product/big/20191231/3daa45dd1c4e144caf23f1b199124610.jpg")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("네저스네버라이트", "가 1대5 한타를 이기고 하늘에서 떨어졌어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "7") {
    message.channel.send("http://img.danawa.com/prod_img/500000/840/156/img/3156840_1.jpg?shrink=360:360&_v=20200326113047")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("으악내코카콜라", "가 코를 고치다가 결국 음료수가 되었어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "8") {
    message.channel.send("http://img.danawa.com/prod_img/500000/544/330/img/3330544_1.jpg?shrink=360:360&_v=20200616102007")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("우리가 만난지 벌써 오렌지 환타", "가 인연을 만나고 곤두박질 쳤어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "9") {
    message.channel.send("http://m.nonghyupmall.com/prdimg/02/120/017/016/010/9002671681_0_400_20180404173546.jpg")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("파워레몬에엑따", "가 레몬이랑 섞이다가 싫어서 떨어졌어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "10") {
    message.channel.send("http://photo3.enuri.info/data/images/service/big/664000/664579.jpg")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("웰컹스 포도맛", "이 컹컹 거리다가 결국 에엑따 되었어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "11") {
    message.channel.send("http://img.danawa.com/prod_img/500000/797/784/img/1784797_1.jpg?shrink=360:360&_v=20170228165548")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("밀맛나는 밀키스", "가 옆에 있던 밀의 즙을 흡수해 떨어졌어요.")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "12") {
    message.channel.send("http://img.danawa.com/prod_img/500000/824/206/img/2206824_1.jpg?shrink=360:360&_v=20170801100400")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("포카리스웨터", "가 스웨터를 만들다가 결국 떨어져썽요..")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
  } else if(japangi == "13") {
    message.channel.send("https://health.chosun.com/site/data/img_dir/2021/04/26/2021042601836_0.jpg")
    let em = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setAuthor("알트 봇", img)
    .addField("카피", "가 복사를 히다 음료수화 되어 굴러졌어요")
    .setTimestamp()
    .setFooter('MD BOT',mdlog)
    
    message.channel.send(em)
    } 
   } else {
    let embed = new Discord.MessageEmbed()
    .setColor('#00a495')
    .setAuthor("알트 봇", img)
    .setTitle('결제 오류')
    .setDescription(`${name}님, 계좌로 결제를 할 수 없었어요.`)
    .addField(`${name}님의 현재 잔액은`, `${user.money}원 이에요!`)
    .setFooter('MD BOT',mdlog)
    .setTimestamp();

    message.channel.send(embed)
   }
  } else {
    let embed = new Discord.MessageEmbed()
        .setColor('#00a495')
        .setAuthor("알트 봇", img)
        .setDescription(`${name}님의 계좌는, 아직 비활성 상태에요.`)
        .setFooter('MD BOT',mdlog)
        .setTimestamp();
  
        message.channel.send(embed)
  }
    
  } else if(message.content.startsWith('알트야 복권')){
        const id = message.author.id;
        const name = message.author.username;

        const filePath = `./userdata/${id}.json`;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
    if(user.id) {
      if(user.money >= 1000) {
    // console.log(message.author.id + "님이 복권 로드")
      let bokone1 = Math.floor((Math.random() * 200) + 1)
      let random = Math.floor((Math.random() * 200) + 1)
  
      if(bokone1 == random) {
  
       let embed = new Discord.MessageEmbed()
       .setColor('#0000FF')
       .setAuthor("알트 봇", img)
       .setTitle('복권 안내')
       .addField('축하해요!', '복권에 당첨되셨어요!')
       .setTimestamp()
       .setFooter('MD BOT',mdlog)
  
       message.channel.send(embed)
       saveUser = {
        id,
        name,
        date,
        money : user.money + 123456872,
       } 
       fs.writeFileSync(filePath, JSON.stringify(saveUser));
      } 
      else
      {
       let embed = new Discord.MessageEmbed()
  
       .setColor('#d9534f')
       .setAuthor("알트 봇", img)
       .setTitle('복권 안내')
       .addField('아쉽게도,', '복권에 당첨되지 않으셨어요!')
       .setTimestamp()
       .setFooter('MD BOT',mdlog)
  
       message.channel.send(embed)
       } saveUser = {
        id,
        name,
        date,
        money : user.money - 1000,
       } 
       fs.writeFileSync(filePath, JSON.stringify(saveUser));
      } else {
        let embed = new Discord.MessageEmbed()
             .setColor('#00a495')
             .setAuthor("알트 봇", img)
             .setTitle('결제 오류')
             .setDescription(`${name}님, 계좌로 결제를 할 수 없었어요.`)
             .addField(`${name}님의 현재 잔액은`, `${user.money}원 이에요!`)
             .setFooter('MD BOT',mdlog)
             .setTimestamp();
      
             message.channel.send(embed)
      } 
     } else {
      let embed = new Discord.MessageEmbed()
        .setColor('#00a495')
        .setAuthor("알트 봇", img)
        .setDescription(`${name}님의 계좌는, 아직 비활성 상태에요.`)
        .setFooter('MD BOT',mdlog)
        .setTimestamp();
  
        message.channel.send(embed)
     }
    } else if(message.content.startsWith('알트야 로또')) {
      //console.log(message.author.id + "님이 로또 로드") debuging
        let number = message.content.slice('알트야 로또 '.length);
        let random = Math.floor((Math.random() * 500) + 1)

        

        const id = message.author.id;
        const name = message.author.username;

        const filePath = `./userdata/${id}.json`;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
  
        if(user.id) {
          if(user.money >= 1000) {
     
          if(number == random) {
           let embed = new Discord.MessageEmbed()
          .setColor('#0000FF')
          .setAuthor("알트 봇", img)
          .setTitle('당첨 결과')
          .setDescription(`이번 번호는 ${random} 이였고, ${name}님이 선택하신 숫자는 ${number}이였어요.`)
          .addField('로또에 당첨되셨어요!', '축하드려요!')
          .setTimestamp()
          .setFooter('MD BOT',mdlog)
     
          message.channel.send(embed)
         saveUser = {
          id,
          name,
          date,
          money : user.money + 1000000000,
         }      
         fs.writeFileSync(filePath, JSON.stringify(saveUser));
          }
          else
          {
           let embed = new Discord.MessageEmbed()
           .setColor('#d9534f')
           .setAuthor("알트 봇", img)
           .setTitle('당첨 결과')
           .setDescription(`이번 번호는 ${random} 이였고, ${name}님이 선택하신 숫자는 ${number}이였어요.`)
           .addField('로또에 아쉽게도 당첨되지 않으셨어요!', '행운을 빌게요!')
           .setTimestamp()
           .setFooter('MD BOT',mdlog)
      
           message.channel.send(embed)
          } saveUser = {
            id,
            name,
            date,
            money : user.money - 1000,
          } 
          fs.writeFileSync(filePath, JSON.stringify(saveUser));
        } else {
          let embed = new Discord.MessageEmbed()
               .setColor('#00a495')
               .setAuthor("알트 봇", img)
               .setTitle('결제 오류')
               .setDescription(`${name}님, 계좌로 결제를 할 수 없었어요.`)
               .addField(`${name}님의 현재 잔액은`, `${user.money}원 이에요!`)
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
        
               message.channel.send(embed)
        } 
         // message.reply("debug" + saveUser)
        } else {
          let embed = new Discord.MessageEmbed()
        .setColor('#00a495')
        .setAuthor("알트 봇", img)
        .setDescription(`${name}님의 계좌는, 아직 비활성 상태에요.`)
        .setFooter('MD BOT',mdlog)
        .setTimestamp();
  
        message.channel.send(embed)
        }
       } else if (!message.guild) return;
  
    
       else if (message.content.startsWith('알트야 추방')) {
        //console.log(message.author.id + "님이 추방 로드")
         if(!message.member.hasPermission("MANAGE_MESSAGES")) {
           let embed = new Discord.MessageEmbed()
           .setColor('#dc143c')
           .setAuthor("알트 봇", img)
           .setTitle('추방 실패')
           .setDescription(`${message.author.username}님은 추방할 수 있는 마땅한 권한이 없어요.`)
           .setFooter('MD BOT',mdlog)
           .setTimestamp();
   
           message.channel.send(embed)
         }
         else
         {
         
         const user = message.mentions.users.first();
         
         if (user) {
           
           const member = message.guild.member(user);
           
           if (member) {
             
             member.kick('운영자가 당신을 추방하였습니다.').then(() => {
               
               let embed = new Discord.MessageEmbed()
               .setColor('#00a495')
               .setAuthor("알트 봇", img)
               .setTitle('추방 성공')
               .setDescription(user.tag + '님을 성공적으로 추방 하였어요!')
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
   
               message.channel.send(embed)
             }).catch(err => {
               
               let embed = new Discord.MessageEmbed()
               .setColor('#dc143c')
               .setAuthor("알트 봇", img)
               .setTitle("추방 실패")
               .setDescription("알수 없는 오류가 발생했어요.")
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
   
               message.channel.send(embed)
               
               console.error(err);
             });
           } else {
             
             let embed = new Discord.MessageEmbed()
               .setColor('#dc143c')
               .setAuthor("알트 봇", img)
               .setTitle('추방 실패')
               .setDescription('이 회원은 서버에 존재하지 않아요.')
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
   
               message.channel.send(embed)
           }
           
         } else {
           let embed = new Discord.MessageEmbed()
          .setAuthor("알트 봇", img)
          .setColor('#dc143c')
          .setTitle('추방 실패')
          .setDescription('@을 사용해 언급 후, 다시 시도해 보세요!')
          .setFooter('MD BOT',mdlog)
          .setTimestamp();
   
          message.channel.send(embed)
         }
       }
     }  if (!message.guild) return;
    
     if (message.content.startsWith('알트야 차단'))
       if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    //    console.log(message.author.id + "님이 차단 로드")
         let embed = new Discord.MessageEmbed()
         .setColor('#dc143c')
         .setAuthor("알트 봇", img)
         .setTitle('차단 실패')
         .addField('당신은 차단할', '마땅한 권한이 없어요!')
         .setFooter('MD BOT',mdlog)
         .setTimestamp();
  
         message.channel.send(embed)
       } 
       else
       { 
       const user = message.mentions.users.first();
      
       if (user) {
         
         const member = message.guild.member(user);
         
         if (member) {
           
           member.ban({
             reason: '봇이 너를 처단해따.',
           }).then(() => {
             
             let embed = new Discord.MessageEmbed()
             .setColor('#00a495')
             .setAuthor("알트 봇", img)
             .setTitle('차단 성공')
             .setFooter('MD BOT',mdlog)
             .addField(user.tag + '님을' , '성공적으로 차단 하였어요!')
             .setTimestamp();
  
             message.channel.send(embed)
            
           }).catch(err => {
             
             let embed = new Discord.MessageEmbed()
             .setColor('#dc143c')
             .setAuthor("알트 봇", img)
             .setTitle('차단 실패')
             .addField('이 회원을 차단할 수 없었어요!', '권한을 확인하고 다시 시도해 주세요!')
             .setTimestamp()
             .setFooter('MD BOT',mdlog)
  
             message.channel.send(embed)
             
             console.error(err);
           });
         } else {
           
           let embed = new Discord.MessageEmbed()
             .setColor('#dc143c')
             .setAuthor("알트 봇", img)
             .setTitle('차단 실패')
             .addField('이 회원은 서버에 존재하지 않아요.', '서버에 존재하는 유저 대상을 골라주세요!')
             .setTimestamp()
             .setFooter('MD BOT',mdlog)
  
             message.channel.send(embed)
         }
       } else {
       
       let embed = new Discord.MessageEmbed()
       .setColor('#dc143c')
       .setAuthor("알트 봇", img)
       .setTitle('차단 실패')
       .addField('차단할 사용자를 언급하지 않으셨어요.', '@을 사용해 언급 후, 다시 시도해 보세요!')
       .setTimestamp()
       .setFooter('MD BOT',mdlog)
  
       message.channel.send(embed)
       }
      } else if(message.content.startsWith("알트야 가위") || message.content.startsWith("알트야 바위") || message.content.startsWith("알트야 보") || message.content.startsWith("알트야 묵") || message.content.startsWith("알트야 찌") || message.content.startsWith("알트야 빠")) {
        const human = message.content.slice('알트야 '.length);
        if(human == "가위" || human == "찌") { 
          const human = "가위" 
          final(human)
        }
        if(human == "바위" || human == "묵") {
          const human = "바위"
          final(human) 
        }
        if(human == "보" || human == "빠") {
          const human = "보"
          final(human)
        }

        async function final(human) {
        console.log(human) //debug
        const list = ["가위", "바위", "보"];
        const random = Math.floor(Math.random() * 3);
        const bot = list[random];
        let winner = "";
    
        if(human === bot) {
          winner = "비김";
        }
        else {
          human === "가위" ? (winner = bot === "바위" ? "저" : `${message.author.username}`) : "";
          human === "바위" ? (winner = bot === "보" ? "저" : `${message.author.username}`) : "";
          human === "보" ? (winner = bot === "가위" ? "저" : `${message.author.username}`) : "";
        }
       message.channel.send(`사람 : ${convertEmoji(human)} vs 봇 : ${convertEmoji(bot)}`)
      
       const embed = new Discord.MessageEmbed()
       embed.setColor("#13ad65")
       embed.setAuthor("알트 봇", img)
       embed.setTitle('가위바위보 결과')
       embed.setDescription(`${winner == "비김" ? "비겼네요. 저희 생각이 같네요!" : winner + "(님)의 승리에요!"}`)
       embed.setTimestamp()
       embed.setFooter('MD BOT',mdlog)

       message.channel.send(embed)
       if(winner == `${message.author.username}`) {
        const id = message.author.id;
        const name = message.author.username;

        const filePath = `./userdata/${id}.json`;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
       if(user.id) {
         message.channel.send("승리하셔서 소량의 돈을 지급해드렸어요.")
        saveUser = {
          id,
          name,
          date,
          money : user.money + 1000,
         } 
         fs.writeFileSync(filePath, JSON.stringify(saveUser));
       }
       }
      }
      } else if(message.content == "알트야 코로나") {
        message.channel.send("로드 중이에요. 이 작업은 시간이 걸릴 수 있어요.")
        request('https://api.corona-19.kr/korea/beta/?serviceKey=x7dgolHIpRczX1Fh8MVQTS4fbLOCNmks9', (err, res, body) => {
          if(!err) {
          let json = JSON.parse(body);
            
          let COVIDEmbed = new Discord.MessageEmbed()
            .setColor('#ffa500')
            .setTitle(`${json.API.updateTime}`, "http://ncov.mohw.go.kr/static/image/header/shim.png")
            .setURL('http://ncov.mohw.go.kr/')
            .setThumbnail("https://yt3.ggpht.com/ytc/AKedOLRx1o4FfsK5isI9U-EHzAt7S57Knoyv7MoEIGKpGw=s900-c-k-c0x00ffffff-no-rj")
            .setAuthor("알트 봇", img)
            .addFields()
            .addField(`국내 확진자수`,`${json.korea.totalCnt}명 `, true)
            .addField(`국내 완치자수`, `${json.korea.recCnt}명`, true)
            .addField(`국내 사망자수`, `${json.korea.deathCnt}명`, true)
            .addField(`국내 자가격리 환자 수`, `${json.korea.isolCnt}명`)
            .setDescription(`가장 많은 확진자가 발생한 시/군/구는 ${json.API.topCountries.country1N}이에요.`)
            .setTimestamp()
            .setFooter('MD BOT',mdlog)
          
            message.channel.send(COVIDEmbed);
            } else {
              message.channel.send(apierr)
            }
        })
      } else if(message.content.startsWith("알트야 투표")) {
        let tp = message.content.slice('알트야 투표 '.length);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
          //    console.log(message.author.id + "님이 차단 로드")
               let embed = new Discord.MessageEmbed()
               .setColor('#dc143c')
               .setAuthor("알트 봇", img)
               .setTitle('투표 실패')
               .addField('당신은 투표 할 수 있는', '마땅한 권한이 없어요!')
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
        
               message.channel.send(embed)
             } 
             else
             { 

        const embed = new Discord.MessageEmbed()
        .setAuthor("알트 봇", img)
        .setTitle("🔔 | 투표 알림")
        .setDescription(tp)
        .setFooter('MD BOT',mdlog)
        .setTimestamp()
        .setColor("RED")

        message.channel.send(embed)
        message.channel.send("<@everyone>")
        .then((message) => {
            message.react("👍")
            message.react("👎") 
            message.react('👊')

        });
      }
    } 
    const id = message.author.id;
    const name = message.author.username;
  
    const filePath = `./userdata/${id}.json`;
  
    !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
  
    const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const today = new Date();
    const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
    const howMuch = Math.floor((Math.random() * 10000) + 0);
  
    if(message.content === "알트야 돈내놔" || message.content === "알트야 지급"){
      let saveUser = {};
      if(user.id) {
        if(user.date === date) {
          //message.channel.send(user.date + date)
          let embed = new Discord.MessageEmbed()
               .setColor('#dc143c')
               .setAuthor("알트 봇", img)
               .setTitle('뺏을 수 없음')
               .setDescription("더 이상 제 돈을 뺏을 수 없어요.")
               .addField("하지만 서버에서 채팅을 칠때마다 10원씩", "지급된다는걸 잊지마세요!")
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
        
               message.channel.send(embed)
          saveUser = user;
        }
        else {
          let embed = new Discord.MessageEmbed()
               .setColor('#00a495')
               .setAuthor("알트 봇", img)
               .setTitle('돈 뺏음')
               .addField(`${howMuch}원을 \n${name}님이 뺴았었어요.`,  `현재 잔액은 ${user.money + howMuch}원 이에요.`)
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
        
               message.channel.send(embed)
         // message.reply(`${howMuch}원이 지급됐어!\n${name}의 현재 잔액은 ${user.money} -> ${user.money + howMuch}이야!`);
          saveUser = {
            id,
            name,
            date,
            money : user.money + howMuch,
          }
        }
      }
      else {
        let embed = new Discord.MessageEmbed()
        .setColor('#00a495')
        .setAuthor("알트 봇", img)
        .setDescription(`${name}님의 계좌는, 아직 비활성 상태에요.`)
        .setFooter('MD BOT',mdlog)
        .setTimestamp();
  
        message.channel.send(embed)
      }
  
      fs.writeFileSync(filePath, JSON.stringify(saveUser));
    }
  
    if(message.content === "알트야 잔액" || message.content === "알트야 내돈"){
    const id = message.author.id;
    const name = message.author.username;
  
    const filePath = `./userdata/${id}.json`;
  
    !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
  
    const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const today = new Date();
    const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
    if(user.id) {
     // user.id ? 
      let embed = new Discord.MessageEmbed()
               .setColor('#00a495')
               .setAuthor("알트 봇", img)
               .setDescription(`${name}님의 계좌에, ${user.money}원이 있어요.`)
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
        
               message.channel.send(embed)
     // message.reply(`${name}님의 현재 잔액은 ${user.money}원 이에요.`) : message.reply(`계좌가 등록되지 않았어요`);
     } else {
      let embed = new Discord.MessageEmbed()
      .setColor('#00a495')
      .setAuthor("알트 봇", img)
      .setDescription(`${name}님의 계좌는, 아직 비활성 상태에요.`)
      .setFooter('MD BOT',mdlog)
      .setTimestamp();

      message.channel.send(embed)
     }
    } if(message.content === "알트야 계좌" || message.content === "알트야 지갑" || message.content === "알트야 내계좌" || message.content === "알트야 내지갑"){
      const id = message.author.id;
      const name = message.author.username;
    
      const filePath = `./userdata/${id}.json`;
    
      !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
    
      const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const today = new Date();
      const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
      if(user.id) {
       // user.id ? 
        let embed = new Discord.MessageEmbed()
                 .setColor('#00a495')
                 .setAuthor("알트 봇", img)
                 .setThumbnail("https://image.flaticon.com/icons/png/512/1424/1424912.png")
                 .setTitle("알트 은행")
                 .addField("계좌 번호", `${id}`)
                 .addField("소유자", `${name}`)
                 .addField("잔액", `${user.money}`, true)
                 .addField("마지막 사용날짜", `${user.date}`, true)
                 .setFooter('MD BOT',mdlog)
                 .setTimestamp();
          
                 message.channel.send(embed)
       // message.reply(`${name}님의 현재 잔액은 ${user.money}원 이에요.`) : message.reply(`계좌가 등록되지 않았어요`);
       } else {
        let embed = new Discord.MessageEmbed()
        .setColor('#00a495')
        .setAuthor("알트 봇", img)
        .setDescription(`${name}님의 계좌는, 아직 비활성 상태에요.`)
        .setFooter('MD BOT',mdlog)
        .setTimestamp();
  
        message.channel.send(embed)
       }
    } if(message.content) {
      const id = message.author.id;
        const name = message.author.username;

        const filePath = `./userdata/${id}.json`;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
       if(user.id) {
        saveUser = {
          id,
          name,
          date,
          money : user.money + 10,
         } 
         fs.writeFileSync(filePath, JSON.stringify(saveUser));
      }
    } if(message.content == "알트야 등록" || message.content == "알트야 계좌등록"){
      const id = message.author.id;
        const name = message.author.username;

        const filePath = `./userdata/${id}.json`;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
        const howMuch = Math.floor((Math.random() * 30000) + 5000);
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
       if(user.id) {
        let embed = new Discord.MessageEmbed()
               .setColor('#dc143c')
               .setAuthor("알트 봇", img)
               .setTitle('이미 등록됨')
               .setDescription(`${name}님의 계좌는 이미 등록되어 있어요.`)
               .setFooter('MD BOT',mdlog)
               .setTimestamp();
        
               message.channel.send(embed)

       //message.reply(`${name}!! 시작하는걸 환영해! ${howMuch}원이 지급됐어!`);
      
        } else {
         let embed = new Discord.MessageEmbed()
        .setColor('#00a495')
        .setAuthor("알트 봇", img)
        .setTitle('새로운 시작')
        .addField(`${name}님, 알트봇을 시작하신 걸 환영해요.`,  `${howMuch}원을 지급해드릴게요.`)
        .setFooter('MD BOT',mdlog)
        .setTimestamp();
 
        message.channel.send(embed)
        saveUser = {id, name, date, money : howMuch};
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        }
    }  else if(message.content == "알트야 한강온도" || message.content == "알트야 온도") {
      request('https://api.hangang.msub.kr/', (err, res, body) => {
    
        let json = JSON.parse(body);
      if(!err) {
        let hangang = new Discord.MessageEmbed()
          .setColor('#0275d8')
          .setTitle(`한강 물 온도`,"https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=lcskmh&logNo=220473161770")
          .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Korea-Seoul-Han_River-01.jpg/275px-Korea-Seoul-Han_River-01.jpg")
          .setAuthor("알트 봇", img)
          .setDescription(`${json.time}기준으로 ${json.temp}도 에요.`)
          .setTimestamp()
          .setFooter('MD BOT',mdlog)
        
          message.channel.send(hangang);
    } else {
      message.channel.send(apierr)
    }
      })
    } else if(message.content.startsWith("알트야 링크축약")) {
      

  var client_id = 'WPpgWWFYgEv2vQXoQICH';//개발자센터에서 발급받은 Client ID
  var client_secret = 'b8eZwuXYdB'; //개발자센터에서 발급받은 Client Secret
  var query = encodeURI("https://developers.naver.com/docs/utils/shortenurl");

   var api_url = 'https://openapi.naver.com/v1/util/shorturl';

   var options = {
       url: api_url,
       form: {'url':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
   };
   request(options, function (error, response, body) {
    let json = JSON.parse(body);
     if (!error && response.statusCode == 200) {
       message.channel.send("처리완료. 마도#8614로 문의해주세요.")
     } else {
       message.channel.send(apierr)
       console.log('error = ' + response.statusCode + json);
     }
    })

    } else if(message.content.startsWith("알트야 릴리즈")) {
      message.channel.send(releases)
    } 
})
const queue = new Map();

client.on('message', (message) => { //여기는 대가리 아프니깐 적어둠 (by 마도)

  if (message.author.bot) return;
  if(message.guild.id == "728441087668256780"){
    if(dev == "false") {
      return;
    }
   } 
   
   const serverQueue = queue.get(message.guild.id);
 
   if (message.content.startsWith(`알트야 재생`)) {
     let args = message.content.slice('알트야 재생 '.length);
     const connection = await msg.member.voice.channel.join();
     const search = await yts(args.join(" "))
     const videos = search.videos.slice( 0, 1 )
     youtube.addParam('type', 'music');
     youtube.search(search, 1, function (err, result) {
      if (err) { let embed = new Discord.MessageEmbed()
        .setColor("#d9534f")
            .setAuthor("알트 봇", img)
            .setTitle("재생 오류")
            .setDescription(err)
            .setTimestamp()
            .setFooter('MD BOT',mdlog)
      
          message.channel.send(embed);console.log(err); return; }
     execute(message, serverQueue, result);
      });
     return;
   } else if (message.content.startsWith(`알트야 스킵`)) {
     skip(message, serverQueue);
     return;
   } else if (message.content.startsWith(`알트야 멈춰`) || message.content.startsWith("알트야 스탑")) {
     stop(message, serverQueue);
     return;
   } else if(message.content.startsWith("알트야 목록")) {
    if (!serverQueue) { let embed = new Discord.MessageEmbed()
          .setColor("#d9534f")
          .setAuthor("알트 봇", img)
          .setTitle("로드 오류")
          .setDescription("아직 재생중인 노래가 없는거 같아요.")
          .setTimestamp()
          .setFooter('MD BOT',mdlog)
          return message.channel.send(embed) }
    let embed = new Discord.MessageEmbed();
    embed.setColor("#13ad65")
    embed.setAuthor("알트 봇", "https://static.wixstatic.com/media/bcc14d_3e3c3489f7dd45759fc0d6b01fe1a270~mv2.jpg/v1/fill/w_339,h_313,al_c,q_80,usm_0.66_1.00_0.01/KakaoTalk_20210804_170059173.webp")
    embed.setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
    embed.setTitle(`**🎵 현재 재생중 : ** ${serverQueue.songs[0].title}`)
    embed.setTimestamp()
    embed.setFooter('MD BOT',mdlog)

		return message.channel.send(embed);

  } else if (message.content.startsWith(`알트야 노래방`)) {
    let keyword = message.content.slice('알트야 노래방 '.length);
    const music = 1
    youtube.addParam('type', 'video');
    youtube.search(keyword + "inst", 1, function (err, result) {
     if (err) { let embed = new Discord.MessageEmbed()
       .setColor("#d9534f")
           .setAuthor("알트 봇", img)
           .setTitle("재생 오류")
           .setDescription(err)
           .setTimestamp()
           .setFooter('MD BOT',mdlog)
     
         message.channel.send(embed);console.log(err); return; }

     });
    return;
  }
 });
 
 async function execute(message, serverQueue, result) {
   let args = `https://www.youtube.com/watch?v=${result["items"][0]["id"]["videoId"]}`
   let img = `https://img.youtube.com/vi/${result["items"][0]["id"]["videoId"]}/mqdefault.jpg`
   const voiceChannel = message.member.voice.channel;
   if (!voiceChannel)
     return message.channel.send(
       "음성 채널에 있어야 재생이 가능해요."
     );
   const permissions = voiceChannel.permissionsFor(message.client.user);
   if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
     return message.channel.send(
       "이 채널에 관한 권한이 없어요."
     );
   }
 
   const songInfo = await ytdl.getInfo(args);
  // console.log(songInfo)
   const song = {
         title: songInfo.videoDetails.title,
         url: songInfo.videoDetails.video_url,
         img : img
    };
 
   if (!serverQueue) {
     const queueContruct = {
       textChannel: message.channel,
       voiceChannel: voiceChannel,
       connection: null,
       songs: [],
       volume: 5,
       playing: true
     };
 
     queue.set(message.guild.id, queueContruct);
 
     queueContruct.songs.push(song);
 
     try {
       var connection = await voiceChannel.join();
       queueContruct.connection = connection;
       play(message.guild, queueContruct.songs[0]);
      // const guild = message.guild
     //  const song = queueContruct.songs[0]
      // play(guild, song);
     } catch (err) {
      let embed = new Discord.MessageEmbed()
      .setColor("#d9534f")
          .setAuthor("알트 봇", "https://static.wixstatic.com/media/bcc14d_3e3c3489f7dd45759fc0d6b01fe1a270~mv2.jpg/v1/fill/w_339,h_313,al_c,q_80,usm_0.66_1.00_0.01/KakaoTalk_20210804_170059173.webp")
          .setTitle("재생 오류가 발생했어요.")
          .setDescription(err)
          .setTimestamp()
          .setFooter('MD BOT',mdlog)
    
        message.channel.send(embed)
       console.log(err);
       queue.delete(message.guild.id);
       return message.channel.send(err);
     }
   } else {
     serverQueue.songs.push(song);
     let embed = new Discord.MessageEmbed()
     .setColor("#13ad65")
     .setAuthor("알트 봇", "https://static.wixstatic.com/media/bcc14d_3e3c3489f7dd45759fc0d6b01fe1a270~mv2.jpg/v1/fill/w_339,h_313,al_c,q_80,usm_0.66_1.00_0.01/KakaoTalk_20210804_170059173.webp")
     .setTitle(song.title)
     .setThumbnail(song.img)
     .setDescription("이 대기열에 추가되었어요.")
     .setTimestamp()
     .setFooter('MD BOT',mdlog)
     return message.channel.send(embed);
   }
 }
 
 function skip(message, serverQueue) {
//   console.log("SKIP");
   if (!message.member.voice.channel)
  
   
  return message.channel.send(joinerr);
//   console.log("SKIP1");
 
   if (!serverQueue)

   return message.channel.send(skiperr);
//    console.log("SKIP2");
    serverQueue.songs.shift();
    play(message.guild, serverQueue.songs[0]);
    let embed = new Discord.MessageEmbed()
     .setColor("#13ad65")
     .setAuthor("알트 봇", img)
     .setDescription("재생 중인 음악을 건너뛰었어요.")
     .setTimestamp()
     .setFooter('MD BOT',mdlog)
 
     serverQueue.textChannel.send(embed);
 }
 
 function stop(message, serverQueue) {
   if (!message.member.voice.channel)
   
   return message.channel.send(joinerr);
     
   if (!serverQueue)
  
   return message.channel.send(stoperr);
     
   serverQueue.songs = [];
   serverQueue.connection.dispatcher.end();
   let embed = new Discord.MessageEmbed()
     .setColor("#13ad65")
     .setAuthor("알트 봇", img)
     .setDescription("재생 중인 음악을 멈췄어요.")
     .setTimestamp()
     .setFooter('MD BOT',mdlog)
 
 
     serverQueue.textChannel.send(embed);
 }
 
 function play(guild, song) {
   const serverQueue = queue.get(guild.id);
   if (!song) {
     serverQueue.voiceChannel.leave();
     queue.delete(guild.id);
     return;
   }
 
   const dispatcher = serverQueue.connection
     .play(ytdl(song.url))
     .on("finish", () => {
       serverQueue.songs.shift();
       play(guild, serverQueue.songs[0]);
     })
     .on("error", error => console.error(error));
   dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

   let embed = new Discord.MessageEmbed()
     .setColor("#13ad65")
     .setAuthor("알트 봇", img)
     .setTitle(song.title)
     .setThumbnail(song.img)
     .setDescription("이 지금 재생중이에요.")
     .setTimestamp()
     .setFooter('MD BOT',mdlog)
 
     serverQueue.textChannel.send(embed);
 }

   client.on("message", (message) => {
    if(message.author.bot) return;
    if(message.guild.id == "842640836084629514"){

    if (message.content.startsWith("//도움")) {
    //  console.log(message.author.id + "님이 도움말 로드")
        let img = "https://media.discordapp.net/attachments/802180575376179285/830093931780767815/89020687_p0_2.jpg?width=676&height=676"
        let alsoimg = "https://media.discordapp.net/attachments/802180575376179285/830000059771912232/89003369_p0_master1200.png?width=478&height=676"
        let embed = new Discord.MessageEmbed()
        .setTitle("이타도리 봇 도움말")
        .setColor("#13ad65")
        .setAuthor("이타도리", alsoimg)
        .setThumbnail(img)
        .addFields()
        .addField("//짤", "이 방에 있는 친구들의 짤을 로드합니다", true)
        .addFields()
        .setTimestamp()
        .setFooter('MD BOT',mdlog)

        message.channel.send(embed)
    } if (message.content.includes('//짤')) {
      //console.log(message.author.id + "님이 짤 로드")
      switch (Math.floor((Math.random() * 24  ) + 1)) {
       case 1:
          message.reply("로블록스를 하고 있는 이수현 짤을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/802180575376179285/830088871115096124/20210324_083247_HDR.jpg?width=304&height=676")
          break;
       case 2:
          message.reply("말도 안되게 잘생긴 김민수 사진을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/740552787229671424/830086388577468517/KakaoTalk_20200315_124734869.jpg?width=507&height=676")
          break;
       case 3:
          message.reply("김민수 사진2 을(를) 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/802180575376179285/830086890828595221/unknown.png?width=1205&height=676")
          break;
       case 4:
          message.reply("순진했던 성진이 사진을 로드했어요")
          message.channel.send("https://media.discordapp.net/attachments/730055025824628748/874896490181558352/20210811_150520_HDR.jpg?width=1440&height=648")
          break;
       case 5:
          message.reply("스트리머 장수관 사진을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/802180575376179285/830090548114358332/unknown.png?width=1017&height=676")
          break;
       case 6:
          message.reply("수현이가 로블록스 안해줘서 기다리는 윤지환 사진을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/666210435061514250/817771402835787816/unknown.png")
          break;
        case 7:
         message.reply("행복한 꿈을 꾸는 수민이 사진을 로드헀어요")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/874893098570887228/20210619_195207.png?width=935&height=701")
         break;
        case 8:
         message.reply("더위 때문에 짜증난 민찬이 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/874893116375719946/KakaoTalk_20210810_020030704.png")
         break;
       case 9:
         message.reply("일본 가기 싫었는데 끌려가서 슬픈 세현이 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/874894647124701264/received_1857090291264584_2.jpeg?width=445&height=701")
         break;
       case 10:
         message.reply("순진했던 그때 그 시절 이도경 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/874896493620891658/20210811_150509_HDR.jpg?width=1440&height=648")
         break;
       case 11:
         message.reply("여친 생기는 꿈꿔서 진짜 생기는줄 아는 동훈이 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/872853419059187755/874898794905489448/Screenshot_20200927-221436_Gallery.jpg?width=332&height=701")
         break;
       case 12:
         message.reply("깡패 민수 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876096641952809020/7e24ddecdf57cc98.png")
         break;
       case 13:
        message.reply("창가에서 머리박고 햄버거 먹는 세현이 사진을 로드했어요.")
        message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876096775482654730/1611647499864.png?width=526&height=701")
        break;
       case 14:
         message.reply("모기장에 갇힌 현우와 민규 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/842640836084629517/876097593132859392/20210619_190349.jpg?width=526&height=701")
        break;
       case 15:
         message.reply("한심좌 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/790814628505583647/876096188196196442/FB_IMG_1620743448778.jpg")
         break;
       case 16:
         message.reply("순진했던 그때 그 시절 김민수 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876099002179932160/401b49c4f023e0fb.png")
         break;
       case 17:
         message.reply("개말린 김민규 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876099485305040926/FB_IMG_1582558070720.png?width=435&height=701")
         break;
       case 18:
         message.reply("모모 수민이 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876099822917128212/20210619_195209.png?width=935&height=701")
         break;
       case 19:
         message.reply("6학년 이도경 사진을 로드했어요.")
         message.delete()
         message.channel.send(":no_entry_sign: 개발자가 검열한 사진입니다. (Not Found: 404)")
         break;
       case 20:
         message.reply("생일 파티하는 세현이와 친구들 사진을 로드했어요.")
         message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876100366922559548/20210814_224950.png")
         break;
        case 21:
          message.reply("케이크를 에엑따하려는 세현이 사진을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876100866988445716/20210814_225130.png")
          break;
        case 22:
          message.reply("V를 하는 수민이 사진을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876100885816692786/20210814_225123.png")
          break;
       case 23:
          message.reply("졸업 사진을 찍는 세현이와 수민이 사진을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/730055025824628748/876101429004238868/20200220_100214.png?width=935&height=701")
         break;
        case 24:
          message.reply("TS된 민찬이 사진을 로드했어요.")
          message.channel.send("https://media.discordapp.net/attachments/790814628505583647/876096340600434688/FB_IMG_1619511974979.jpg?width=581&height=701")
          break;
        }
    } 
  } 
});
console.log(`스크립트를 모두 읽었어요.`)
console.log(`--------------------------------------------`)
if(dev == "true") {
client.login(devtoken); 
} else {
  client.login(token)
}