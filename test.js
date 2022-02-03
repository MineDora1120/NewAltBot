const Discord = require("discord.js");
const token = "NjgwMDM0ODY0MzMzODQ4NTkz.Xk6B0g.Aa2GGw7xASYMu3CiSCqCpQ5fw6U"
const prefix = "!"
const yts = require('yt-search')
const ytdl = require("ytdl-core");
const PlaylistSummary = require('youtube-playlist-summary')

const config = {
    GOOGLE_API_KEY: 'AIzaSyCNnMvLcoWfHhnsIXF2LtIBHYpJylhv7iY', // require
    PLAYLIST_ITEM_KEY: ['title', 'videoUrl'], // option
  }

const ps = new PlaylistSummary(config)

const client = new Discord.Client();

const queue = new Map();

client.on("ready", () => {
  console.log(`Logged as ${client.user.tag}!`)
});

client.on("message", async(msg) => {

  if(msg.content.startsWith(prefix+"p"||prefix+"play")){
      const args = msg.content.split(" ").slice(1)

      if(!args[0]){
          const embed2 = new Discord.MessageEmbed()
          .setTitle('**사용법 `'+prefix+'p 노래이름`**')
          .setColor('RED')
          msg.reply(embed2)

      } else if (msg.member.voice.channel) {
       
          const connection = await msg.member.voice.channel.join();
          const search = await yts(args.join(" "))
     //     console.log(search)
        // console.log(search.all)
         if (queue.get(msg.guild.id)) {
            let send = queue.get(msg.guild.id)
            const videos = search.videos.slice( 0, 1 )
            if(search.all[0].type == `video`) {
            videos.forEach(async function(v){
                
                    console.log("video")
                const views = String(v.views).padStart(10, '')
                const listing = new Discord.MessageEmbed()
                .setTitle("**"+v.title+"**")
                .setColor(0x4169e1)
                .setImage(v.thumbnail)
                .addFields(
                    {name:'**업로더**',value:`[${v.author.name}](${v.author.url})`,inline:true},
                    {name:'**길이**',value:v.timestamp, inline:true},
                    {name:'**조횟수**',value:views, inline:true}
                )
                .setDescription('대기열에 추가하였습니다.')
  
                msg.channel.send(listing)

                send.url.push(v.url)
                send.name.push(v.thumbnail)
                send.author.push(v.author.name)
                
            })
              } else if(search.all[0].type == `list`) {
                
                const url = search.all[0].listId
                console.log("done")
                ps.getPlaylistItems(url)
                .then((result) => {
                 if(queue.get(msg.guild.id)) {
                    let send = queue.get(msg.guild.id)
                    console.log(result)
                    for(var database of Object.values(result.items)) {
                        console.log(database)
                        send.url.push(database.videoUrl)
                        send.name.push(database.title)
                        send.author.push(search.all[0].author.name) 
    
                    }  const listing = new Discord.MessageEmbed()
                    .setTitle("**"+search.all[0].title+"**")
                    .setColor(0x4169e1)
                    .setImage(`https://img.youtube.com/vi/${result.items[0].videoID}/mqdefault.jpg`)
                    .addFields(
                        {name:'**제작**',value:`[${search.all[0].author.name}](${search.all[0].author.url})`,inline:true},
                        {name:'**수록된 곡**',value:search.all[0].videoCount, inline:true}
                    )
                    .setDescription('앨범/목록이 대기열에 추가되었어요.')
                }
                })
                .catch((error) => {
                  console.error(error)
                })
            }
     
         } else {
            
          if(search.all[0].type == `video`) {
          const videos = search.videos.slice( 0, 1 )
          videos.forEach(async function(v){
         
              const views = String(v.views).padStart(10, '')
              const playing = new Discord.MessageEmbed()
              .setTitle("**"+v.title+"**")
              .setColor(0x4169e1)
              .setImage(v.thumbnail)
              .addFields(
                  {name:'**업로더**',value:`[${v.author.name}](${v.author.url})`,inline:true},
                  {name:'**길이**',value:v.timestamp, inline:true},
                  {name:'**조횟수**',value:views, inline:true}
              )
              .setDescription('유튜브에서 노래를 재생합니다.')

              msg.channel.send(playing)
              const urls = v.url
              play(urls, connection, msg);

              const SoundQueue = {
                url : [v.url],
                name : [v.thumbnail],
                author : [v.author.name]
               }
            queue.set(msg.guild.id,SoundQueue);
          
          })
        } else if(search.all[0].type == `list`) {
                
            const url = search.all[0].listId
            console.log("done")
            ps.getPlaylistItems(url)
            .then((result) => {
             if(queue.get(msg.guild.id)) {
                let send = queue.get(msg.guild.id)
                console.log(result)
                for(var database of Object.values(result.items)) {
                    console.log(database)
                    send.url.push(database.videoUrl)
                    send.name.push(database.title)
                    send.author.push(search.all[0].author.name) 

                }  const listing = new Discord.MessageEmbed()
                .setTitle("**"+search.all[0].title+"**")
                .setColor(0x4169e1)
                .setImage(`https://img.youtube.com/vi/${result.items[0].videoID}/mqdefault.jpg`)
                .addFields(
                    {name:'**제작**',value:`[${search.all[0].author.name}](${search.all[0].author.url})`,inline:true},
                    {name:'**수록된 곡**',value:search.all[0].videoCount, inline:true}
                )
                .setDescription('앨범/목록에 있는 첫 음악을 재생하고, 나머지를 대기열에 추가했어요.')
            }
            })
            .catch((error) => {
              console.error(error)
            })
        }
    }
    
    
      } else {
          const embed = new Discord.MessageEmbed()
          .setTitle('**음성 채널에 먼저 접속해주세요!**')
          .setColor('RED')
          msg.reply(embed)
      }
  }
  if(msg.content === prefix+"나가"){
      if(!msg.guild.me.voice.channel){
          const embed = new Discord.MessageEmbed()
          .setTitle('**저는 이미 음성채널에 나간 상태입니다.**')
          .setColor('RED')
          msg.reply(embed)
      }else if(!msg.member.voice.channel){
          const embed = new Discord.MessageEmbed()
          .setTitle('**음성 채널에 먼저 접속해주세요!**')
          .setColor('RED')
          msg.reply(embed)
      }else{
          await msg.member.voice.channel.leave();
          const embed = new Discord.MessageEmbed()
          .setTitle('**안녕히계세요 여러분**')
          .setColor('GREEN')
          msg.reply(embed)
      }
  }
  if(msg.content === prefix+"참가"){
      if(!msg.member.voice.channel){
          const embed = new Discord.MessageEmbed()
          .setTitle('**음성 채널에 먼저 접속해주세요!**')
          .setColor('RED')
          msg.reply(embed)
      }else{
          await msg.member.voice.channel.join();
      }
  }
  if(msg.content === prefix+"도움"){
      const embed = new Discord.MessageEmbed()
      .setColor(0x4169e1)
      .setTitle("**"+client.user.username+" 도움말**")
      .addField(prefix+'play <원하는 음악>','봇이 음악을 재생합니다',true)
      .addField(prefix+'참가','봇이 음성채널에 참가합니다',true)
      .addField(prefix+'나가','봇이 음성채널에서 퇴장합니다',true)
      .setFooter("Open source by GDHello#5042","https://cdn.discordapp.com/avatars/764365162273964043/798ab406533795028ea109f0ae72096b.webp?size=80")
      msg.reply(embed)
  }
})

function play(urls, connection, msg) {
    connection.play(ytdl(urls,{filter:'audioonly'})).on('finish',()=>{
      
      if(Object.values(queue.get(msg.guild.id).url).length == 1) {
        const end = new Discord.MessageEmbed()
        .setTitle('**노래를 종료합니다.**')
        .setColor(0x4169e1)
        msg.reply(end)
        queue.delete(msg.guild.id)
       // msg.channel.send("false")
        msg.member.voice.channel.leave();
        console.log("system done")
      } else {
          queue.get(msg.guild.id).url.shift();
          queue.get(msg.guild.id).name.shift();
          queue.get(msg.guild.id).author.shift();
          const urls = queue.get(msg.guild.id).url[0]
     //     msg.channel.send("true")
          console.log("list done")
          play(urls, connection, msg)
      }
    })
}


client.login(token)
