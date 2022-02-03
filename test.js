

const prefix = "!"
const yts = require('yt-search')
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
                
               //     console.log("video")
                const views = String(v.views).padStart(10, '')
                const listing = new Discord.MessageEmbed()
                .setTitle("**"+v.title+"**")
                .setColor("#13ad65")
                .setImage(v.thumbnail)
                .addFields(
                    {name:'**업로더**',value:`[${v.author.name}](${v.author.url})`,inline:true},
                    {name:'**길이**',value:v.timestamp, inline:true},
                    {name:'**조횟수**',value:views, inline:true}
                )
                .setDescription('이 영상을 대기열에 추가하였어요.')
                .setAuthor("알트 봇", img)
                .setTimestamp()
                .setFooter('MD BOT',mdlog)
  
                msg.channel.send(listing)

                send.url.push(v.url)
                send.name.push(v.thumbnail)
                send.author.push(v.author.name)
                
            })
              } else if(search.all[0].type == `list`) {
                
                const url = search.all[0].listId
            //    console.log("done")
                ps.getPlaylistItems(url)
                .then((result) => {
                 
                    let send = queue.get(msg.guild.id)
                    console.log(result)
                    for(var database of Object.values(result.items)) {
                    //    console.log(database)
                        send.url.push(database.videoUrl)
                        send.name.push(database.title)
                        send.author.push(search.all[0].author.name) 
    
                    }  const listing = new Discord.MessageEmbed()
                    .setTitle("**"+search.all[0].title+"**")
                    .setColor("#13ad65")
                    .setImage(`https://img.youtube.com/vi/${result.items[0].videoId}/mqdefault.jpg`)
                    .addFields(
                        {name:'**제작**',value:`[${search.all[0].author.name}](${search.all[0].author.url})`,inline:true},
                        {name:'**수록된 곡**',value:search.all[0].videoCount, inline:true}
                    )
                    .setAuthor("알트 봇", img)
                    .setTimestamp()
                    .setFooter('MD BOT',mdlog)
                    .setDescription('앨범/목록이 대기열에 추가되었어요.')
                
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
              .setColor("#13ad65")
              .setImage(v.thumbnail)
              .addFields(
                  {name:'**업로더**',value:`[${v.author.name}](${v.author.url})`,inline:true},
                  {name:'**길이**',value:v.timestamp, inline:true},
                  {name:'**조회수**',value:views, inline:true}
              )
              .setAuthor("알트 봇", img)
              .setTimestamp()
              .setFooter('MD BOT',mdlog)
              .setDescription('유튜브에서 노래를 재생했어요.')

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
            ps.getPlaylistItems(url)
            .then((result) => {
         //       console.log(result)
                const SoundQueue = {
                    url : [],
                    name : [],
                    author : []
                   }
                   
                play(result.items[0].videoUrl,connection,msg)
                for(var database of Object.values(result.items)) {
               //     console.log(database)
                    SoundQueue.url.push(database.videoUrl)
                    SoundQueue.name.push(database.title)
                    SoundQueue.author.push(search.all[0].author.name) 

                }  
                queue.set(msg.guild.id,SoundQueue);
             //   console.log(`https://img.youtube.com/vi/${result.items[1].videoId}/mqdefault.jpg`)
                const listing = new Discord.MessageEmbed()
                .setTitle("**"+search.all[0].title+"**")
                .setColor("#13ad65")
                .setImage(`https://img.youtube.com/vi/${result.items[1].videoId}/mqdefault.jpg`)
                .addFields(
                    {name:'**제작**',value:`[${search.all[0].author.name}](${search.all[0].author.url})`,inline:true},
                    {name:'**수록된 곡**',value:search.all[0].videoCount, inline:true}
                )
                .setAuthor("알트 봇", img)
                .setTimestamp()
                .setFooter('MD BOT',mdlog)
                .setDescription('앨범/목록에 있는 첫 음악을 재생하고, 나머지를 대기열에 추가했어요.')

                msg.channel.send(listing)
            
            })
            .catch((error) => {
              console.error(error)
            })
        }
    }
    
    
      } else {
        const joinerr = new Discord.MessageEmbed() 
        joinerr.setColor("#d9534f")
        joinerr.setAuthor("알트 봇", img)
        joinerr.setTitle("음성 채널 입장")
        joinerr.setDescription("먼저, 음성 채널에 입장해 주세요!")
        joinerr.setTimestamp()
        joinerr.setFooter('MD BOT',mdlog)

        msg.channel.send(joinerr)
      }
  }
  if(msg.content === prefix+"나가"){
      if(!msg.guild.me.voice.channel){
        const joinerr = new Discord.MessageEmbed() 
        joinerr.setColor("#d9534f")
        joinerr.setAuthor("알트 봇", img)
        joinerr.setTitle("이미 나감")
        joinerr.setDescription("저는 이미 음성채널을 나갔어요.")
        joinerr.setTimestamp()
        joinerr.setFooter('MD BOT',mdlog)

        msg.channel.send(joinerr)
      }else if(!msg.member.voice.channel){
        const joinerr = new Discord.MessageEmbed() 
        joinerr.setColor("#d9534f")
        joinerr.setAuthor("알트 봇", img)
        joinerr.setTitle("음성 채널 입장")
        joinerr.setDescription("먼저, 음성 채널에 입장해 주세요!")
        joinerr.setTimestamp()
        joinerr.setFooter('MD BOT',mdlog)

        msg.channel.send(joinerr)
      }else{
          msg.member.voice.channel.leave();
          const joinerr = new Discord.MessageEmbed() 
          joinerr.setColor("#50fd50")
          joinerr.setAuthor("알트 봇", img)
          joinerr.setDescription("음성채널을 나갔어요.")
          joinerr.setTimestamp()
          joinerr.setFooter('MD BOT',mdlog)

            msg.channel.send(joinerr)
      }
  }
  if(msg.content === prefix+"참가"){
      if(!msg.member.voice.channel){
        const joinerr = new Discord.MessageEmbed() 
        joinerr.setColor("#d9534f")
        joinerr.setAuthor("알트 봇", img)
        joinerr.setTitle("음성 채널 입장")
        joinerr.setDescription("먼저, 음성 채널에 입장해 주세요!")
        joinerr.setTimestamp()
        joinerr.setFooter('MD BOT',mdlog)

        msg.channel.send(joinerr)
      }else{
          await msg.member.voice.channel.join();
          const joinerr = new Discord.MessageEmbed() 
          joinerr.setColor("#50fd50")
          joinerr.setAuthor("알트 봇", img)
          joinerr.setDescription("음성채널에 입장했어요.")
          joinerr.setTimestamp()
          joinerr.setFooter('MD BOT',mdlog)

        msg.channel.send(joinerr)
      }
  }
})

function play(urls, connection, msg) {
    connection.play(ytdl(urls,{filter:'audioonly'})).on('finish',()=>{
      
      if(Object.values(queue.get(msg.guild.id).url).length == 1) {
        const end = new Discord.MessageEmbed()
        .setTitle('**노래를 종료합니다.**')
        .setColor("#13ad65")
        msg.reply(end)
        queue.delete(msg.guild.id)
       // msg.channel.send("false")
        msg.member.voice.channel.leave();
        //console.log("system done")
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
