/**
 * 淫夢語録検出器（完全版）
 * Inmu Glossary Detector - Complete Database
 */

class InmuDetector {
    constructor() {
        this.database = {
            direct: [
                // ========== 野獣先輩語録 ==========
                { phrase: "やったぜ。", source: "野獣先輩", category: "名言", aliases: ["やったぜ", "やったぜ!", "やったぜ！", "成し遂げたぜ"] },
                { phrase: "あーつまんね", source: "野獣先輩", category: "名言", aliases: ["あーつまんねぇ", "あーつまんねえ", "あーねんまつ", "あーねんし"] },
                { phrase: "20人以上、30人以下？", source: "野獣先輩", category: "名言" },
                { phrase: "ケツかな？", source: "野獣先輩", category: "名言", aliases: ["ケツかな"] },
                { phrase: "桃かな？", source: "野獣先輩", category: "名言", aliases: ["桃かな", "ももかな"] },
                { phrase: "野球か何か？", source: "野獣先輩", category: "名言", aliases: ["野球か何か"] },
                { phrase: "顔がね・・・", source: "野獣先輩", category: "名言", aliases: ["顔がね...", "顔がね…", "顔がね"] },
                { phrase: "喉渇いた…喉渇かない？", source: "野獣先輩", category: "名言", aliases: ["喉渇いた...喉渇かない？", "のどかわいた"] },
                { phrase: "うんちして♡", source: "野獣先輩", category: "名言", aliases: ["うんちして", "うんちして♥", "うんちして!"] },
                { phrase: "マッチョして♡", source: "野獣先輩", category: "名言", aliases: ["マッチョして", "マッチョして♥"] },
                { phrase: "行きませんか？行きましょうよ", source: "野獣先輩", category: "名言", aliases: ["いきませんか？いきましょうよ", "行きませんか行きましょうよ"] },
                { phrase: "今日は逆さ吊り、鞭責めをしよう（提案）", source: "野獣先輩", category: "名言", aliases: ["今日は逆さ吊り、鞭責めをしよう", "今日は逆さ吊り鞭責めをしよう"] },
                { phrase: "六尺、サポーターになって、H、しよう（提案）", source: "野獣先輩", category: "名言", aliases: ["六尺サポーターになってHしよう", "六尺、サポーターになって、H、しよう"] },
                { phrase: "おう、考えてやるよ（返すとは言っていない）", source: "野獣先輩", category: "名言", aliases: ["おう考えてやるよ", "返すとは言っていない"] },
                { phrase: "自分から入っていくのか…（困惑）", source: "野獣先輩", category: "名言", aliases: ["自分から入っていくのか...", "自分から入っていくのか（困惑）"] },
                { phrase: "え、山下公園行けばいいじゃん", source: "野獣先輩", category: "名言", aliases: ["山下公園行けばいいじゃん"] },
                { phrase: "すっげえキツかったゾ～", source: "野獣先輩", category: "名言", aliases: ["すっげえキツかったぞ", "すっげえきつかったぞ～", "すげえキツかったゾ"] },
                { phrase: "肝心なところ洗い忘れてるゾ", source: "野獣先輩", category: "名言", aliases: ["肝心なところ洗い忘れてるぞ", "かんじんなところ洗い忘れてるぞ"] },
                { phrase: "今日はいっぱい飲むゾ～", source: "野獣先輩", category: "名言", aliases: ["今日はいっぱい飲むぞ", "今日はいっぱいのむぞ～"] },
                { phrase: "嘘つけ絶対見てたゾ", source: "野獣先輩", category: "名言", aliases: ["嘘つけ絶対見てたぞ", "うそつけ絶対見てたぞ", "うそつけぜったいみてたぞ"] },
                { phrase: "いいゾ～これ", source: "野獣先輩", category: "名言", aliases: ["いいぞ～これ", "いいゾこれ", "いいぞこれ"] },
                { phrase: "ステでもやっているのでしかね？あの乳首は", source: "野獣先輩", category: "名言", aliases: ["ステでもやっているのでしかね"] },
                { phrase: "ケツでしょ。", source: "野獣先輩", category: "名言", aliases: ["ケツでしょ", "ケツでしょ！", "ケツでしょ!"] },
                { phrase: "田所さん⁉", source: "野獣先輩", category: "名言", aliases: ["田所さん!", "田所さん", "たどころさん"] },
                { phrase: "俊さん４０歳くらいに見えるのだが･…", source: "野獣先輩", category: "名言", aliases: ["俊さん40歳くらいに見えるのだが", "しゅんさん40歳くらいに見えるのだが"] },
                { phrase: "オトコのケツがこんなに締まりがいいなんて、ショック！", source: "野獣先輩", category: "名言", aliases: ["男のケツがこんなに締まりがいいなんてショック", "おとこのケツがこんなに締まりがいいなんて"] },
                { phrase: "それは大丈夫なんですかね？", source: "野獣先輩", category: "名言", aliases: ["それは大丈夫なんですかね"] },
                { phrase: "南佳也にはまったく似ていません！", source: "野獣先輩", category: "名言", aliases: ["南佳也にはまったく似ていません", "みなみかやにはまったく似ていません"] },
                { phrase: "拓也さんのプリケツエロイ！", source: "野獣先輩", category: "名言", aliases: ["拓也さんのプリケツエロイ", "たくやさんのプリケツエロイ"] },
                { phrase: "申し訳ないが昼はNG", source: "野獣先輩", category: "名言", aliases: ["申し訳ないが昼はng", "もうしわけないがひるはNG"] },
                { phrase: "関係ないだろ！いい加減にしろ！", source: "野獣先輩", category: "名言", aliases: ["関係ないだろいい加減にしろ", "かんけいないだろいいかげんにしろ"] },
                { phrase: "朝日テレビはキャンセルだ", source: "野獣先輩", category: "名言", aliases: ["あさひテレビはキャンセルだ"] },
                { phrase: "もっとやれ", source: "野獣先輩", category: "名言", aliases: ["もっとやれ！", "もっとやれ!"] },
                { phrase: "AV男優の南佳也にそっくりよね。", source: "野獣先輩", category: "名言", aliases: ["AV男優の南佳也にそっくりよね", "AV男優の南佳也にそっくり"] },
                { phrase: "あっ、そうだ", source: "野獣先輩", category: "唐突", aliases: ["あっそうだ", "あっ、そうだ（唐突）"] },
                { phrase: "おいKMRァ！", source: "野獣先輩", category: "呼びかけ", aliases: ["おいKMR", "おいKMRァ", "おいけむあーる"] },
                { phrase: "お前さっき俺ら着替えてる時チラチラ見てただろ", source: "野獣先輩", category: "唐突", aliases: ["お前さっき俺ら着替えてる時チラチラ見てただろ"] },

                // ========== 淫夢二章・その他 ==========
                { phrase: "やりますねぇ！", source: "淫夢二章", category: "名言", regex: /やりますね[ぇえ]!?/, aliases: ["やりますね！", "やりますねえ！", "やりますね", "やりますねぇ", "やりますねえ"] },
                { phrase: "気持ちいいですね（建前）気持ちよくはない！（本音）", source: "淫夢二章", category: "名言", aliases: ["気持ちいいですね気持ちよくはない"] },
                { phrase: "やめろぉ（建前）ナイスゥ（本音）", source: "淫夢二章", category: "名言", aliases: ["やめろぉナイスゥ"] },
                { phrase: "とりあえず脱げ（唐突）", source: "淫夢二章", category: "命令", aliases: ["とりあえず脱げ", "とりあえずぬげ"] },

                // ========== あ行タグ ==========
                { phrase: "ダメみたいですね", tag: "諦め", category: "感情表現", aliases: ["だめみたいですね", "ダメみたいですね（諦め）", "ダメみたいですね（諦観）"] },
                { phrase: "あーもうめちゃくちゃだよ", tag: "呆れ", category: "感情表現", aliases: ["あーもうめちゃくちゃだよぉ"] },
                { phrase: "俺もやったんだからさ", tag: "悪しき風習", category: "名言", aliases: ["おれもやったんだからさ", "俺もやったんだからさ（悪しき風習）", "俺もやったんだからさ（同調圧力）"] },
                { phrase: "ジー！", tag: "アブラゼミ", category: "擬音", aliases: ["ジー", "じー", "じー！"] },
                { phrase: "不法侵入ですよ不法侵入", tag: "天海春香", category: "名言", aliases: ["ふほうしんにゅうですよふほうしんにゅう"] },
                { phrase: "は？", tag: "威圧", category: "感情表現", aliases: ["は?", "はっ？", "はっ?"] },
                { phrase: "勃たしてやれよ？", tag: "イケボ", category: "名言", aliases: ["勃たしてやれよ", "たてさせてやれよ"] },
                { phrase: "次行こうぜ", tag: "イケボ", category: "名言", aliases: ["次いこうぜ", "つぎいこうぜ"] },
                { phrase: "〆鯖ァ！", tag: "石田彰", category: "名言", aliases: ["〆鯖ァ", "しめさばぁ", "しめさばぁ！", "〆鯖ァ！（CV:石田彰）"] },
                { phrase: "してはいけない", tag: "戒め", category: "名言", aliases: ["してはいけない（戒め）"] },
                { phrase: "いいだろお前成人の日だぞ", tag: "意味不明", category: "名言", aliases: ["いいだろお前成人の日だぞ（意味不明）"] },
                { phrase: "朝飯食ったから…", tag: "意味不明", category: "名言", aliases: ["朝飯食ったから...", "あさめしくったから"] },
                { phrase: "警察だ！", tag: "インパルス板倉", category: "名言", aliases: ["けいさつだ", "けいさつだ！"] },
                { phrase: "あっ、おい待てい", tag: "江戸っ子", category: "方言", aliases: ["あっおい待てい", "あっおいまて"] },
                { phrase: "どこ触ってんでぃ！", tag: "江戸っ子", category: "方言", aliases: ["どこさわってんでぃ", "どこ触ってんじゃ"] },
                { phrase: "出そうと思えば", tag: "王者の風格", category: "名言", aliases: ["でそうとおもえば", "出そうと思えば（王者の風格）", "出そうと思えば（自由自在）", "出そうと思えば（天衣無縫）"] },
                { phrase: "アメフトォ…", tag: "大嘘", category: "名言", aliases: ["アメフト...", "あめふとぉ"] },
                { phrase: "アメフト部…", tag: "大嘘", category: "名言", aliases: ["アメフト部...", "あめふとぶ"] },
                { phrase: "水泳の練習ゥ…", tag: "大嘘", category: "名言", aliases: ["水泳の練習ぅ", "すいえいのれんしゅう"] },
                { phrase: "非常に新鮮で、非常に美味しい", tag: "大嘘", category: "名言", aliases: ["非常に新鮮で非常に美味しい", "ひじょうにしんせんでひじょうにおいしい"] },
                { phrase: "愛のパワーをください！", tag: "大声", category: "名言", aliases: ["愛のパワーをください", "あいのぱわーをください", "愛のパワーをください！（池沼）", "愛のパワーをください！（池沼大声）"] },
                { phrase: "Hな看護してください！", tag: "大声", category: "名言", aliases: ["Hな看護してください", "えっちなかんごしてください", "Hな看護してください！（池沼）", "Hな看護してください！（池沼大声）"] },
                { phrase: "焼く時は！", tag: "大声", category: "名言", aliases: ["やくときは", "焼く時は"] },
                { phrase: "ひぃ～", tag: "大崎甜花", category: "擬音", aliases: ["ひぃ", "ひぃ～", "ひぃー"] },
                { phrase: "警察に通報しちゃうからなお前", tag: "お茶目", category: "名言", aliases: ["けいさつにつうほうしちゃうからなお前"] },

                // ========== か行タグ ==========
                { phrase: "あっ、いいっすよ", tag: "快諾", category: "返答", aliases: ["あっいいっすよ", "あいいっすよ"] },
                { phrase: "おう、考えてやるよ", tag: "返すとは言っていない", category: "名言", aliases: ["おう考えてやるよ"] },
                { phrase: "くさい", tag: "確信", category: "感情表現", aliases: ["臭い", "クサイ", "くさい（確信）"] },
                { phrase: "これこそ食通だな！", tag: "確信", category: "感情表現", aliases: ["これこそ食通だな"] },
                { phrase: "俺ノンケちゃうかもしれんな", tag: "覚醒", category: "名言", aliases: ["おれノンケちゃうかもしれんな", "俺ノンケちゃうかもしれんな（覚醒）"] },
                { phrase: "ああ逃れられない！", tag: "カルマ", category: "名言", aliases: ["ああ逃れられない", "ああのがれられない"] },
                { phrase: "お前ホモか！", tag: "歓喜", category: "感情表現", aliases: ["おまえホモか", "お前ホモか", "お前ホモか！"] },
                { phrase: "あっついねん！", tag: "関西弁", category: "方言", aliases: ["あっついねん", "あついねん"] },
                { phrase: "おまんこぉ＾～", tag: "気さくな挨拶", category: "挨拶", aliases: ["おまんこぉ", "おまんこ～", "おまんこぉ~"] },
                { phrase: "お前ノンケかよぉ！", tag: "驚愕", category: "感情表現", aliases: ["お前ノンケかよ", "おまえノンケかよぉ"] },
                { phrase: "なんだこのオッサン⁉", tag: "驚愕", category: "感情表現", aliases: ["なんだこのオッサン", "なんだこのおっさん", "なんだこのおっさん!"] },
                { phrase: "ファッ⁉", tag: "驚愕", category: "感情表現", aliases: ["ファッ", "ふぁっ", "ふぁっ!"] },
                { phrase: "ほんとぉ？", tag: "狂気", category: "感情表現", aliases: ["ほんとぉ", "ほんと", "ほんと?", "ほんとぉ？", "ほんとぉ？（狂気）", "ほんとぉ？（無邪気）"] },
                { phrase: "笑っちゃうんすよね", tag: "強者の余裕", category: "感情表現", aliases: ["わらっちゃうんすよね", "笑っちゃうんすよね（強者の余裕）"] },
                { phrase: "僕は違います", tag: "半ギレ", category: "感情表現", aliases: ["ぼくは違います", "僕は違います（半ギレ）", "僕は違います（食い気味）"] },
                { phrase: "うまいぞフェラ", tag: "空気", category: "名言", aliases: ["うまいぞフェラ（空気）"] },
                { phrase: "はぁ～～～", tag: "クソデカため息", category: "感情表現", aliases: ["はぁ~~~", "はぁ～～～（クソデカため息）"] },
                { phrase: "OK？OK牧場？", tag: "激寒", category: "ジョーク", aliases: ["OK?OK牧場", "OK牧場"] },
                { phrase: "今日は東京行く", tag: "決意", category: "名言", aliases: ["きょうはとうきょういく", "今日は東京行く（決意）"] },
                { phrase: "ふざけんな！", tag: "声だけ迫真", category: "感情表現", aliases: ["ふざけんな", "ふざけんな!"] },
                { phrase: "しょうがねぇなぁ", tag: "悟空", category: "名言", aliases: ["しょうがねえなぁ", "しょうがねぇなぁ（悟空）"] },
                { phrase: "痛いのに…この人おかしい…", tag: "小声", category: "感情表現", aliases: ["痛いのに...この人おかしい...", "いたいのにこのひとおかしい"] },
                { phrase: "気持ちよくできましたか…？", tag: "小声", category: "名言", aliases: ["気持ちよくできましたか...", "きもちよくできましたか"] },
                { phrase: "ゲッ靴下もかよ…", tag: "小声", category: "名言", aliases: ["ゲッ靴下もかよ...", "げっくつしたもかよ"] },
                { phrase: "ﾁｶﾚﾀ...", tag: "小声", category: "感情表現", aliases: ["チカレタ", "ちかれた", "疲れた"] },
                { phrase: "最後が気持ちよかった", tag: "小並感", category: "感想", aliases: ["最後が気持ちよかった（小学生並みの感想）", "さいごがきもちよかった"] },
                { phrase: "えぇ…", tag: "困惑", category: "感情表現", aliases: ["えぇ...", "えぇ", "ええ", "えぇ…（困惑）", "えぇ…（ドン引き）"] },
                { phrase: "えっそれは…", tag: "困惑", category: "感情表現", aliases: ["えっそれは...", "えっそれは（困惑）"] },
                { phrase: "えっ、何それは…", tag: "ドン引き", category: "感情表現", aliases: ["えっ何それは...", "えっ、何それは（ドン引き）", "えっ、何それは（困惑）"] },
                { phrase: "は？", tag: "困惑", category: "感情表現", aliases: ["は?（困惑）"] },

                // ========== さ行タグ ==========
                { phrase: "こいつ相当変態だな", tag: "再確認", category: "分析", aliases: ["こいつ相当変態だな（再確認）"] },
                { phrase: "やはりヤバい", tag: "分析", category: "分析", aliases: ["やはりヤバい（分析）", "やはりやばい", "やはりヤバい（再確認）"] },
                { phrase: "布団の上で枕を…⁉", tag: "最重要事項", category: "名言", aliases: ["布団の上で枕を...", "布団の上で枕を?!", "ふとんのうえでまくらを", "布団の上で枕を…⁉（最重要事項）", "布団の上で枕を…⁉（重要）"] },
                { phrase: "なんで？", tag: "殺意", category: "感情表現", aliases: ["なんで", "なんで?（殺意）"] },
                { phrase: "あっ…", tag: "察し", category: "感情表現", aliases: ["あっ...", "あっ（察し）"] },
                { phrase: "お友達になるんぜよ！", tag: "薩長同盟", category: "名言", aliases: ["お友達になるんぜよ", "おともだちになるんぜよ"] },
                { phrase: "あっ、そっかぁ…", tag: "悟り", category: "理解", aliases: ["あっそっかぁ...", "あっ、そっかぁ（悟り）", "あっそっかぁ（池沼）"] },
                { phrase: "穴は一つしかないから", tag: "至言", category: "名言", aliases: ["あなはひとつしかないから"] },
                { phrase: "俺もしてほしいけどなぁ〜", tag: "嫉妬", category: "感情表現", aliases: ["おれもしてほしいけどなぁ", "俺もしてほしいけどなぁ〜（嫉妬）"] },
                { phrase: "ケツ舐められたことあんのかよ誰かによ", tag: "嫉妬", category: "感情表現", aliases: ["ケツ舐められたことあんのかよ"] },
                { phrase: "しばらくホッとしたろう！", tag: "指摘", category: "名言", aliases: ["しばらくホッとしたろう"] },
                { phrase: "ちょっと歯ぁ当たんよ～", tag: "指摘", category: "名言", aliases: ["ちょっと歯ぁ当たんよ", "ちょっとはぁあたんよ"] },
                { phrase: "縛らなきゃ", tag: "使命感", category: "名言", aliases: ["縛らなきゃ（使命感）", "しばらなきゃ"] },
                { phrase: "早く帰って宿題しなきゃ", tag: "使命感", category: "名言", aliases: ["はやくかえってしゅくだいしなきゃ"] },
                { phrase: "悲しいなぁ…", tag: "諸行無常", category: "感情表現", aliases: ["悲しいなぁ（諸行無常）", "かなしいなぁ"] },
                { phrase: "ｳｰﾝ...", tag: "心停止", category: "擬音", aliases: ["うーん...", "うーん（心停止）"] },
                { phrase: "あっすいません", tag: "素", category: "謝罪", aliases: ["あっすいません（素）"] },
                { phrase: "何だお前", tag: "素", category: "反応", aliases: ["なんだお前", "何だお前（素）"] },
                { phrase: "いや～キツイっす", tag: "素", category: "感想", aliases: ["いやキツイっす", "いや～きついっす"] },
                { phrase: "ア！", tag: "スタッカート", category: "擬音", aliases: ["ア!（スタッカート）", "あ！"] },
                { phrase: "さあ何のことか", tag: "すっとぼけ", category: "返答", aliases: ["さあ何のことか（すっとぼけ）"] },
                { phrase: "そうだったかなぁ…", tag: "すっとぼけ", category: "返答", aliases: ["そうだったかなぁ（すっとぼけ）"] },
                { phrase: "何のこったよ？", tag: "すっとぼけ", category: "返答", aliases: ["何のこったよ", "なんのこったよ"] },
                { phrase: "お前もしかして、あいつのことが好きなのか？", tag: "青春", category: "名言", aliases: ["お前もしかしてあいつのことが好きなのか", "おまえもしかしてあいつのことがすきなのか"] },
                { phrase: "えっ、そんなん関係ないでしょ", tag: "正論", category: "名言", aliases: ["えっそんなん関係ないでしょ"] },
                { phrase: "聞くって言ったのに聞かねぇってお前おかしいだろそれよぉ！", tag: "正論", category: "名言", aliases: ["聞くって言ったのに聞かねぇってお前おかしいだろそれよぉ"] },
                { phrase: "何で見る必要なんかあるんですか", tag: "正論", category: "名言", aliases: ["なんで見る必要なんかあるんですか"] },
                { phrase: "やめてくれよ…", tag: "絶望", category: "感情表現", aliases: ["やめてくれよ...", "やめてくれよ（絶望）"] },
                { phrase: "やだよ", tag: "即答", category: "返答", aliases: ["やだよ（即答）", "やだよ!"] },

                // ========== た行タグ ==========
                { phrase: "今日は、アドルフ・アイヒマンが逮捕された日なんですよ", tag: "暗黒微笑", category: "名言", aliases: ["今日はアドルフ・アイヒマンが逮捕された日なんですよ"] },
                { phrase: "じゃあ、死のうか", tag: "暗黒微笑", category: "名言", aliases: ["じゃあ死のうか", "じゃあ死のうか（暗黒微笑）"] },
                { phrase: "工事完了です…", tag: "達成感", category: "感想", aliases: ["工事完了です...", "こうじかんりょうです"] },
                { phrase: "気持ちいいですね", tag: "建前", category: "感想", aliases: ["きもちいいですね（建前）"] },
                { phrase: "気持ちよくはない！", tag: "本音", category: "感想", aliases: ["きもちよくはない（本音）"] },
                { phrase: "やめろぉ", tag: "建前", category: "感情表現", aliases: ["やめろぉ（建前）", "やめろお"] },
                { phrase: "ナイスゥ", tag: "本音", category: "感情表現", aliases: ["ナイスゥ（本音）", "ないすぅ"] },
                { phrase: "冗談はよしてくれ", tag: "タメ口", category: "名言", aliases: ["じょうだんはよしてくれ", "冗談はよしてくれ（タメ口）"] },
                { phrase: "わかるわかる", tag: "タメ口", category: "共感", aliases: ["わかるわかる（タメ口）"] },
                { phrase: "あっ、そっかぁ…", tag: "池沼", category: "理解", aliases: ["あっそっかぁ（池沼）"] },
                { phrase: "コーラいっぱい飲むゾ〜", tag: "池沼", category: "名言", aliases: ["コーラいっぱい飲むぞ", "こーらいっぱいのむぞ"] },
                { phrase: "馬鹿じゃねぇの", tag: "嘲笑", category: "感情表現", aliases: ["馬鹿じゃねぇの（嘲笑）", "ばかじゃねーの"] },
                { phrase: "やめちくり～", tag: "挑発", category: "感情表現", aliases: ["やめちくり", "やめちくり～（挑発）"] },
                { phrase: "まるで桃みたいだぁ…", tag: "直喩", category: "名言", aliases: ["まるで桃みたいだぁ", "まるでももみたいだぁ"] },
                { phrase: "出会いたい！", tag: "出会い厨", category: "名言", aliases: ["出会いたい", "であいたい"] },
                { phrase: "おっ、そうだな", tag: "適当", category: "返答", aliases: ["おっそうだな", "おっそうだな（適当）"] },
                { phrase: "よし", tag: "適当", category: "返答", aliases: ["よし（適当）", "よし!"] },
                { phrase: "おお…ゆうさく…", tag: "ﾃﾞｹﾃﾞｹﾃﾞｹ", category: "名言", aliases: ["おおゆうさく", "おお…ゆうさく…"] },
                { phrase: "ラグビーってなんだよ", tag: "哲学", category: "名言", aliases: ["ラグビーってなんだよ（哲学）", "らぐびーってなんだよ"] },
                { phrase: "わかる？この罪の重さ", tag: "哲学", category: "名言", aliases: ["わかるこの罪の重さ"] },
                { phrase: "馬鹿野郎お前俺は勝つぞお前！", tag: "天下無双", category: "名言", aliases: ["馬鹿野郎お前俺は勝つぞお前", "ばかやろうおれはかつぞ"] },
                { phrase: "DJDJ…", tag: "届かぬ想い", category: "擬音", aliases: ["DJDJ", "DJDJ（届かぬ想い）", "でぃーじぇーでぃーじぇー"] },

                // ========== な行タグ ==========
                { phrase: "え、何？俺とセックスしたいって？", tag: "難聴", category: "名言", aliases: ["え何俺とセックスしたいって", "え、何？俺とセックスしたいって"] },
                { phrase: "ｳﾚｼｲ...ｳﾚｼｲ...", tag: "ﾆﾁﾆﾁ", category: "感情表現", aliases: ["ウレシイ...ウレシイ...", "うれしい...うれしい..."] },
                { phrase: "YO！", tag: "日顕", category: "挨拶", aliases: ["YO", "YO!"] },
                { phrase: "これはなんだ〜？証拠物件として押収するからな〜？", tag: "ねっとり", category: "名言", aliases: ["これはなんだ証拠物件として押収するからな"] },

                // ========== は行タグ ==========
                { phrase: "ひとつくらい…食べてもバレへんか", tag: "バカッター", category: "名言", aliases: ["ひとつくらい食べてもバレへんか"] },
                { phrase: "お前らニュートリノだからな", tag: "博識", category: "名言", aliases: ["お前らニュートリノだからな（博識）", "おまえらにゅーとりのだからな"] },
                { phrase: "またチンポコダンスを踊るぜ？", tag: "初耳", category: "名言", aliases: ["またチンポコダンスを踊るぜ", "またちんぽこだんすをおどるぜ"] },
                { phrase: "やべぇ、撃っちゃった", tag: "冷静", category: "名言", aliases: ["やべぇ撃っちゃった", "やべーうっちゃった", "やべぇ、撃っちゃった（冷静）", "やべぇ、撃っちゃった（他人事）"] },
                { phrase: "郵便屋GOお前！", tag: "人違い", category: "名言", aliases: ["郵便屋GOお前", "ゆうびんやGOおまえ"] },
                { phrase: "あーさっぱりした", tag: "皮肉", category: "感情表現", aliases: ["あーさっぱりした（皮肉）"] },
                { phrase: "そうだよ", tag: "便乗", category: "返答", aliases: ["そうだよ（便乗）", "そうだよ!"] },
                { phrase: "よかったら、お話でもしましょうぞ", tag: "武士", category: "名言", aliases: ["よかったらお話でもしましょうぞ"] },
                { phrase: "見たけりゃ見せてやるよ", tag: "震え声", category: "名言", aliases: ["見たけりゃ見せてやるよ（震え声）", "みたけりゃみせてやるよ"] },
                { phrase: "頭にきますよ", tag: "憤怒", category: "感情表現", aliases: ["頭にきますよ（憤怒）", "あたまにきますよ"] },
                { phrase: "どうしてくれんのこれ", tag: "憤怒", category: "感情表現", aliases: ["どうしてくれんのこれ（憤怒）"] },
                { phrase: "なんてことを…", tag: "憤怒", category: "感情表現", aliases: ["なんてことを...", "なんてことを…（憤怒）"] },
                { phrase: "やっぱり壊れてるじゃないか", tag: "憤怒", category: "感情表現", aliases: ["やっぱり壊れてるじゃないか（憤怒）"] },
                { phrase: "私には理解に苦しむね", tag: "ペチペチ", category: "名言", aliases: ["私には理解に苦しむね（ペチペチ）", "わたしにはりかいにくるしむね"] },

                // ========== ま行タグ ==========
                { phrase: "俺も仲間に入れてくれよ〜", tag: "マジキチスマイル", category: "名言", aliases: ["俺も仲間に入れてくれよ", "おれもなかまにはいれてくれよ"] },
                { phrase: "痛いんだよおおおおおお！", tag: "マジギレ", category: "感情表現", aliases: ["痛いんだよおおおおおお", "いたいんだよぉぉぉぉぉぉ"] },
                { phrase: "この中の中で？", tag: "マトリョーシカ", category: "名言", aliases: ["この中の中で（マトリョーシカ）", "このなかのなかで"] },
                { phrase: "KEN、どうにかしろ", tag: "丸投げ", category: "命令", aliases: ["KENどうにかしろ", "KENどうにかしろ（丸投げ）", "KENどうにかしろ（無責任）", "けんどうにかしろ"] },
                { phrase: "いやーもう十分堪能したよ…", tag: "満身創痍", category: "感想", aliases: ["いやーもう十分堪能したよ...", "いやーもうじゅうぶんたんのうしたよ"] },
                { phrase: "うん、おいしい！", tag: "味覚障害", category: "感想", aliases: ["うんおいしい", "うん、おいしい！（味覚障害）"] },
                { phrase: "バラマキされそうで怖いっすね", tag: "未来予知", category: "名言", aliases: ["ばらまきされそうで怖いっすね", "バラマキされそうで怖いっすね（未来予知）"] },
                { phrase: "そう…", tag: "無関心", category: "反応", aliases: ["そう…（無関心）", "そう..."] },
                { phrase: "じゃあ死ね！", tag: "無慈悲", category: "名言", aliases: ["じゃあ死ね", "じゃあ死ね！（無慈悲）", "じゃあしね"] },
                { phrase: "わーい", tag: "無邪気", category: "感情表現", aliases: ["わーい（無邪気）"] },
                { phrase: "カスが効かねぇんだよ", tag: "無敵", category: "名言", aliases: ["カスが効かねぇんだよ（無敵）", "かすがきかねぇんだよ"] },
                { phrase: "ピトン…ポチョン…", tag: "明鏡止水", category: "擬音", aliases: ["ピトンポチョン", "ぴとんぽちょん"] },
                { phrase: "ドロヘドロ！", tag: "名作", category: "感想", aliases: ["ドロヘドロ", "どろへどろ"] },
                { phrase: "多分変態だと思うんですけど", tag: "名推理", category: "分析", aliases: ["多分変態だと思うんですけど（名推理）", "たぶんへんたいだとおもうんですけど"] },

                // ========== や行タグ ==========
                { phrase: "いつ攻撃を受けてもいいように…", tag: "有能参謀", category: "名言", aliases: ["いつ攻撃を受けてもいいように", "いつこうげきをうけてもいいように"] },

                // ========== ら行タグ ==========
                { phrase: "入んねぇのか…", tag: "落胆", category: "感情表現", aliases: ["入んねぇのか...", "入んねぇのか（落胆）", "はいんねぇのか"] },
                { phrase: "はぅ～", tag: "竜宮レナ", category: "擬音", aliases: ["はぅ", "はぅ～", "はぅー"] },
                { phrase: "そんなことしなくていいから", tag: "良心", category: "名言", aliases: ["そんなことしなくていいから（良心）"] },
                { phrase: "基本イク", tag: "例外あり", category: "名言", aliases: ["基本イク（例外あり）", "きほんいく"] },
                { phrase: "そっか、あったまきた", tag: "冷静", category: "感情表現", aliases: ["そっかあったまきた", "そっか、あったまきた（冷静）"] },
                { phrase: "やばいですね", tag: "冷静", category: "分析", aliases: ["やばいですね（冷静）"] },

                // ========== わ行タグ ==========
                { phrase: "原型ないやん", tag: "笑", category: "感想", aliases: ["原型ないやん（笑）", "げんけいないやん"] },
                { phrase: "ち〜ん", tag: "笑", category: "擬音", aliases: ["ち〜ん（笑）", "ちーん", "ちーん（笑）"] },

                // ================================================================
                // 淫夢語録Wiki（五十音順・逆引き表）からの追加分
                // ================================================================

                // ---------- あ行 ----------
                { phrase: "ああああああああ↓ああああああああ↑", category: "名言" },
                { phrase: "あ゛あ゛あ゛あ゛あ゛あ゛も゛う゛や゛だ゛あ゛あ゛あ゛あ゛あ゛あ゛！！！", category: "名言", aliases: ["あ゛あ゛あ゛あ゛あ゛あ゛も゛う゛や゛だ゛あ゛あ゛あ゛あ゛あ゛あ゛"] },
                { phrase: "ああ＾～もう糞が出るう～～", category: "名言", aliases: ["ああ＾もう糞が出るう", "ああ＾〜もう糞が出るう〜〜", "ああ＾~もう糞が出るう~~"] },
                { phrase: "あ～、いいっすね～", category: "名言", aliases: ["あいいっすね", "あ〜、いいっすね〜", "あ~、いいっすね~"] },
                { phrase: "ｱｰｲｷｿ", source: "野獣先輩", category: "擬音" },
                { phrase: "ｱｰｲｸｯ!", category: "擬音", aliases: ["ｱｰｲｸｯ"] },
                { phrase: "あ＾～うめぇなぁ！", category: "名言", aliases: ["あ＾うめぇなぁ", "あ＾〜うめぇなぁ！", "あ＾~うめぇなぁ！"] },
                { phrase: "あーっ！おぅううっす！おーっ！うーっす！", source: "KBTIT", category: "名言", aliases: ["あーっおぅううっすおーっうーっす"] },
                { phrase: "あーもう一回いってくれ", category: "名言" },
                { phrase: "あ＾～もうおしっこ出ちゃいそう！", category: "名言", aliases: ["あ＾もうおしっこ出ちゃいそう", "あ＾〜もうおしっこ出ちゃいそう！", "あ＾~もうおしっこ出ちゃいそう！"] },
                { phrase: "開いてんじゃ～ん！", category: "名言", aliases: ["開いてんじゃん", "開いてんじゃ〜ん！", "開いてんじゃ~ん！"] },
                { phrase: "あかんこれじゃ患者が死ぬゥ！", category: "名言", aliases: ["あかんこれじゃ患者が死ぬゥ"] },
                { phrase: "あくしろよ", category: "名言" },
                { phrase: "当たり前だよなぁ？", category: "名言", aliases: ["当たり前だよなぁ"] },
                { phrase: "ア゜ッー！", category: "擬音", aliases: ["ア゜ッー"] },
                { phrase: "アッー！", category: "擬音", aliases: ["アッー"] },
                { phrase: "アツゥイ！", category: "名言", aliases: ["アツゥイ"] },
                { phrase: "あっ、これかぁ！", category: "名言", aliases: ["あっこれかぁ"] },
                { phrase: "あったまきた", tag: "冷静", category: "感情表現" },
                { phrase: "穴が広がりそうです", category: "名言" },
                { phrase: "あのさぁ…", category: "名言", aliases: ["あのさぁ"] },
                { phrase: "あのさぁ…イワナ、書かなかった？", category: "名言", aliases: ["あのさぁイワナ書かなかった"] },
                { phrase: "あほくさ", category: "名言" },
                { phrase: "ありがとナス！", source: "KBTIT", category: "名言", aliases: ["ありがとナス"] },
                { phrase: "ありますあります", source: "野獣先輩", category: "名言" },
                { phrase: "あれブルドックスじゃね？", category: "名言", aliases: ["あれブルドックスじゃね"] },
                { phrase: "いいねぇー", source: "野獣先輩", category: "名言" },
                { phrase: "いいよ、来いよ！胸にかけて！胸に！", source: "野獣先輩", category: "名言", aliases: ["いいよ来いよ胸にかけて胸に"] },
                { phrase: "イオンモールの中にまで入っちゃってる！", category: "名言", aliases: ["イオンモールの中にまで入っちゃってる"] },
                { phrase: "いかんのか？", category: "名言", aliases: ["いかんのか"] },
                { phrase: "生き返れ生き返れ…", category: "名言", aliases: ["生き返れ生き返れ"] },
                { phrase: "イキスギィ！", source: "野獣先輩", category: "名言", aliases: ["イキスギィ"] },
                { phrase: "生きてるゥ～！", category: "名言", aliases: ["生きてるゥ", "生きてるゥ〜！", "生きてるゥ~！"] },
                { phrase: "いきますよーいくいく", source: "野獣先輩", category: "名言" },
                { phrase: "イクイクイクイクイクイク！イクよぉ！イク！", category: "名言", aliases: ["イクイクイクイクイクイクイクよぉイク"] },
                { phrase: "イグッ！", category: "擬音", aliases: ["イグッ"] },
                { phrase: "いざ鎌倉！という解放感、高揚感を味わいたいですからね", category: "名言", aliases: ["いざ鎌倉という解放感高揚感を味わいたいですからね"] },
                { phrase: "痛いですね…これは痛い", source: "野獣先輩", category: "名言", aliases: ["痛いですねこれは痛い"] },
                { phrase: "一万円くれたらしゃぶってあげるよ？", category: "名言", aliases: ["一万円くれたらしゃぶってあげるよ"] },
                { phrase: "いつしか雨はやみ、そこには虹がかかるんだよなぁ・・・", source: "淫夢厨", category: "淫夢厨語", aliases: ["いつしか雨はやみそこには虹がかかるんだよなぁ"] },
                { phrase: "いっぱいいっぱい裕次郎", category: "名言" },
                { phrase: "いつもの", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "いなりが入ってないやん", category: "名言" },
                { phrase: "INUE君！病室へ戻ろう！", category: "名言", aliases: ["INUE君病室へ戻ろう"] },
                { phrase: "いやちょっと待ってください…これもしかして、もしかするかもしれませんよ？", category: "名言", aliases: ["いやちょっと待ってくださいこれもしかしてもしかするかもしれませんよ"] },
                { phrase: "いや無理かわかんないだろ！", category: "名言", aliases: ["いや無理かわかんないだろ"] },
                { phrase: "淫夢要素はありません", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "汚汚汚～～～～～～～～～", source: "淫夢厨", category: "淫夢厨語", aliases: ["汚汚汚", "汚汚汚〜〜〜〜〜〜〜〜〜", "汚汚汚~~~~~~~~~"] },
                { phrase: "う、羽毛…", category: "名言", aliases: ["う羽毛"] },
                { phrase: "ヴォエ！", category: "名言", aliases: ["ヴォエ"] },
                { phrase: "動くと当たらないだろ！動くと当たらないだろ！", category: "名言", aliases: ["動くと当たらないだろ動くと当たらないだろ"] },
                { phrase: "うせやろ？", category: "名言", aliases: ["うせやろ"] },
                { phrase: "ウッソだろお前ｗｗｗ", source: "KBTIT", category: "名言" },
                { phrase: "うるせぇ！", category: "名言", aliases: ["うるせぇ"] },
                { phrase: "嬉しいダルルォ？", category: "名言", aliases: ["嬉しいダルルォ"] },
                { phrase: "うわあ……これはAですね", category: "名言", aliases: ["うわあこれはAですね"] },
                { phrase: "遠距離は辛いもんなぁ…", category: "名言", aliases: ["遠距離は辛いもんなぁ"] },
                { phrase: "おいゴルァ！降りろ！免許持ってんのか！", category: "名言", aliases: ["おいゴルァ降りろ免許持ってんのか"] },
                { phrase: "おいやめルルォ！", category: "名言", aliases: ["おいやめルルォ"] },
                { phrase: "オイラー乙ゥ〜", category: "名言", aliases: ["オイラー乙ゥ", "オイラー乙ゥ～", "オイラー乙ゥ~"] },
                { phrase: "オイル塗ろっか？", source: "野獣先輩", category: "名言", aliases: ["オイル塗ろっか"] },
                { phrase: "王道を征く", source: "野獣先輩", category: "名言" },
                { phrase: "お金タダでいいから", source: "KBTIT", category: "名言" },
                { phrase: "おかのした", source: "野獣先輩", category: "名言" },
                { phrase: "おじさんのこと本気で怒らしちゃったねぇ！", category: "名言", aliases: ["おじさんのこと本気で怒らしちゃったねぇ"] },
                { phrase: "おじさんはねぇ、君みたいな可愛いねぇ、子の悶絶する顔が大好きなんだよ！", category: "名言", aliases: ["おじさんはねぇ君みたいな可愛いねぇ子の悶絶する顔が大好きなんだよ"] },
                { phrase: "おじさんやめちくり～", tag: "挑発", category: "感情表現", aliases: ["おじさんやめちくり", "おじさんやめちくり〜", "おじさんやめちくり~"] },
                { phrase: "おっ、開いてんじゃ～ん！", category: "名言", aliases: ["おっ開いてんじゃん", "おっ、開いてんじゃ〜ん！", "おっ、開いてんじゃ~ん！"] },
                { phrase: "オッスオッス！", source: "淫夢厨", category: "淫夢厨語", aliases: ["オッスオッス"] },
                { phrase: "オッスお願いしまーす！", source: "野獣先輩", category: "名言", aliases: ["オッスお願いしまーす"] },
                { phrase: "おっ大丈夫か大丈夫か？", source: "野獣先輩", category: "名言", aliases: ["おっ大丈夫か大丈夫か"] },
                { phrase: "男のオナニーは究極の個人情報だぜ？", category: "名言", aliases: ["男のオナニーは究極の個人情報だぜ"] },
                { phrase: "オナシャス！センセンシャル！", category: "名言", aliases: ["オナシャスセンセンシャル"] },
                { phrase: "お兄さん許して～", category: "名言", aliases: ["お兄さん許して", "お兄さん許して〜", "お兄さん許して~"] },
                { phrase: "オフッ！", category: "擬音", aliases: ["オフッ"] },
                { phrase: "溺れる！溺れる！", category: "名言", aliases: ["溺れる溺れる"] },
                { phrase: "お前さKMRさ、さっきヌッ…脱ぎ終わった時にさ、なかなか風呂来なかったよな？", source: "野獣先輩", category: "名言", aliases: ["お前さKMRささっきヌッ脱ぎ終わった時にさなかなか風呂来なかったよな"] },
                { phrase: "お前精神状態おかしいよ…", category: "名言", aliases: ["お前精神状態おかしいよ"] },
                { phrase: "お前どう？", source: "野獣先輩", category: "名言", aliases: ["お前どう"] },
                { phrase: "お前とりあえず犬の真似しろよ", category: "名言" },
                { phrase: "お前の彼かぁ？", category: "名言", aliases: ["お前の彼かぁ"] },
                { phrase: "お前のことが好きだったんだよ！", source: "野獣先輩", category: "名言", aliases: ["お前のことが好きだったんだよ"] },
                { phrase: "お前初めてかここは？力抜けよ", category: "名言", aliases: ["お前初めてかここは力抜けよ"] },
                { phrase: "お前らクルルァについてこい", category: "名言" },
                { phrase: "おまたせ！アイスティーしかなかったけどいいかな？", source: "野獣先輩", category: "名言", aliases: ["おまたせアイスティーしかなかったけどいいかな"] },
                { phrase: "おもみもも", category: "名言" },
                { phrase: "親方に電話させてもらうね", category: "名言" },
                { phrase: "親が見たら泣きますよ", category: "名言" },
                { phrase: "親の顔より見た光景", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "オラオラ、チンポチンポ、セィヤセィヤ", category: "名言", aliases: ["オラオラチンポチンポセィヤセィヤ"] },
                { phrase: "俺達の雑音に負けるな！", source: "淫夢厨", category: "淫夢厨語", aliases: ["俺達の雑音に負けるな"] },
                { phrase: "俺の心の傷がどんどん癒されていきますよ！", category: "名言", aliases: ["俺の心の傷がどんどん癒されていきますよ"] },
                { phrase: "俺は、AV男優、変態オナニー青年アキラ", category: "名言", aliases: ["俺はAV男優変態オナニー青年アキラ"] },
                { phrase: "俺もソーナノ", category: "名言" },
                { phrase: "俺もそんなにさぁ、このすばのアクアじゃねぇんだよ", source: "KBTIT", category: "名言", aliases: ["俺もそんなにさぁこのすばのアクアじゃねぇんだよ"] },
                { phrase: "終わり！閉廷！以上！皆解散！", category: "名言", aliases: ["終わり閉廷以上皆解散"] },

                // ---------- か行 ----------
                { phrase: "返してしんぜよう", category: "名言" },
                { phrase: "かしこまり！", source: "KBTIT", category: "名言", aliases: ["かしこまり"] },
                { phrase: "ガチャン！ゴン！", category: "名言", aliases: ["ガチャンゴン"] },
                { phrase: "勝手にたまげてろ", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "カットしよう！", category: "名言", aliases: ["カットしよう"] },
                { phrase: "悲しいなぁ", source: "KBTIT", category: "名言" },
                { phrase: "金！暴力！SEX！", category: "名言", aliases: ["金暴力SEX"] },
                { phrase: "彼女とか、いらっしゃらないんですか？", category: "名言", aliases: ["彼女とかいらっしゃらないんですか"] },
                { phrase: "ガバガバどころかスカスカ", category: "名言" },
                { phrase: "仮面ライダーなんだろお前", category: "名言" },
                { phrase: "がわﾞいﾞいﾞなﾞぁﾞだいﾞぢぐんﾞ", category: "名言" },
                { phrase: "菅野美穂", source: "野獣先輩", category: "名言" },
                { phrase: "がんばれ！", source: "淫夢厨", category: "淫夢厨語", aliases: ["がんばれ"] },
                { phrase: "聞いていません", category: "名言" },
                { phrase: "きたない", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "汚ねえケツだなぁ", category: "名言" },
                { phrase: "キメてるんだろ？くれよ…", source: "KBTIT", category: "名言", aliases: ["キメてるんだろくれよ"] },
                { phrase: "ｷﾓ...", category: "擬音" },
                { phrase: "気持ちいいって言ってみろ", category: "名言" },
                { phrase: "気持ちいいんですか男でもッホｗ", category: "名言" },
                { phrase: "気持ちくて…たまらぬ…", category: "名言", aliases: ["気持ちくてたまらぬ"] },
                { phrase: "気持ちよくなっちゃう、ヤバイヤバイ", source: "野獣先輩", category: "名言", aliases: ["気持ちよくなっちゃうヤバイヤバイ"] },
                { phrase: "今日タァイムはどう？伸びた？伸びない？", source: "野獣先輩", category: "名言", aliases: ["今日タァイムはどう伸びた伸びない"] },
                { phrase: "今日も俺、恥ずかしい姿いっぱい晒すよ？", category: "名言", aliases: ["今日も俺恥ずかしい姿いっぱい晒すよ"] },
                { phrase: "清野大地さんの本名出してる奴、それ全然面白くないから", source: "淫夢厨", category: "淫夢厨語", aliases: ["清野大地さんの本名出してる奴それ全然面白くないから"] },
                { phrase: "きらい", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "†悔い改めて†", source: "野獣先輩", category: "名言" },
                { phrase: "ｸｩｰﾝ...", source: "野獣先輩", category: "擬音", aliases: ["ｸｩｰﾝ"] },
                { phrase: "クォクォア…", category: "名言", aliases: ["クォクォア"] },
                { phrase: "くさそう", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "クチアケーナ・ホラ", source: "野獣先輩", category: "名言", aliases: ["クチアケーナホラ"] },
                { phrase: "くっせえなお前", category: "名言" },
                { phrase: "車で言えばどのぐらいだ？", category: "名言", aliases: ["車で言えばどのぐらいだ"] },
                { phrase: "咥えて差し上げろ", category: "名言" },
                { phrase: "ケンちゃんまだ一回表、試合は始まったばっかりよ！", category: "名言", aliases: ["ケンちゃんまだ一回表試合は始まったばっかりよ"] },
                { phrase: "濃いすか？", category: "名言", aliases: ["濃いすか"] },
                { phrase: "こいついつも疲れてんな", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "コイツ完全に全身マンコ状態に落ちたな", source: "KBTIT", category: "名言" },
                { phrase: "こいつすげぇ変態だぜ？", category: "名言", aliases: ["こいつすげぇ変態だぜ"] },
                { phrase: "こういう動画作られるとひでで抜けなくなる", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "公開オナニー", category: "名言" },
                { phrase: "こ、去年ですね", source: "野獣先輩", category: "名言", aliases: ["こ去年ですね"] },
                { phrase: "こ↑こ↓", source: "野獣先輩", category: "名言" },
                { phrase: "ココアライオン", category: "名言" },
                { phrase: "ここすき", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "こちら14万3000円になっております", category: "名言" },
                { phrase: "コ゜ッ！", category: "擬音", aliases: ["コ゜ッ"] },
                { phrase: "こっちの事情も考えてよ", source: "淫夢二章", tag: "棒読み", category: "名言" },
                { phrase: "子供のホモは観るかもしれない", category: "名言" },
                { phrase: "小並感", category: "名言" },
                { phrase: "この辺がセクシー…エロいッ！", source: "野獣先輩", category: "名言", aliases: ["この辺がセクシーエロいッ"] },
                { phrase: "この辺にぃ、うまいラーメン屋の屋台、来てるらしいっすよ", source: "野獣先輩", category: "名言", aliases: ["この辺にぃうまいラーメン屋の屋台来てるらしいっすよ"] },
                { phrase: "これがなかなか…難しいねんな…", category: "名言", aliases: ["これがなかなか難しいねんな"] },
                { phrase: "これ指摘したら淫夢厨ってバレるな…", source: "淫夢厨", category: "淫夢厨語", aliases: ["これ指摘したら淫夢厨ってバレるな"] },
                { phrase: "これだけははっきりと真実を伝えたかった", category: "名言" },
                { phrase: "これはキツイですよ", category: "名言" },
                { phrase: "これは二人ともイキスギだからOKか", category: "名言" },
                { phrase: "これマジ？上半身に比べて下半身が貧弱すぎるだろ…", source: "淫夢厨", category: "淫夢厨語", aliases: ["これマジ上半身に比べて下半身が貧弱すぎるだろ"] },
                { phrase: "これもうわかんねぇな", source: "野獣先輩", category: "名言" },
                { phrase: "語録無視", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "殺されてぇかお前", source: "KBTIT", category: "名言" },
                { phrase: "髪なんか必要ねぇんだよ！", source: "KBTIT", category: "名言", aliases: ["髪なんか必要ねぇんだよ"] },
                { phrase: "殺すのよ。", category: "名言", aliases: ["殺すのよ"] },
                { phrase: "こわいなーとづまりすとこ", category: "名言" },
                { phrase: "こんなぶっといの入れちゃってさ、恥ずかしくないのかよ？", category: "名言", aliases: ["こんなぶっといの入れちゃってさ恥ずかしくないのかよ"] },
                { phrase: "こんなものが、バラまかれたら、俺は一生、変態露出狂のレッテルを背負って生きていくことになる", category: "名言", aliases: ["こんなものがバラまかれたら俺は一生変態露出狂のレッテルを背負って生きていくことになる"] },
                { phrase: "こんなんじゃ商品になんねぇんだよ", source: "淫夢二章", tag: "棒読み", category: "名言" },

                // ---------- さ行 ----------
                { phrase: "最高やな！", category: "名言", aliases: ["最高やな"] },
                { phrase: "サッー！", tag: "迫真", category: "擬音", aliases: ["サッー"] },
                { phrase: "三回だよ三回", category: "名言" },
                { phrase: "36…普通だな！", category: "名言", aliases: ["36普通だな"] },
                { phrase: "30分で、5万！", category: "名言", aliases: ["30分で5万"] },
                { phrase: "三人に勝てるわけないだろ！", category: "名言", aliases: ["三人に勝てるわけないだろ"] },
                { phrase: "三人はどういう集まりなんだっけ？", category: "名言", aliases: ["三人はどういう集まりなんだっけ"] },
                { phrase: "しかし、修行やってます。いつの日か世界を救うと信じて。", source: "野獣先輩", category: "名言", aliases: ["しかし修行やってますいつの日か世界を救うと信じて"] },
                { phrase: "したりしなかったりしろ", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "実家のような安心感", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "自分、指いいすか？", category: "名言", aliases: ["自分指いいすか"] },
                { phrase: "じゃあ俺が勃たしてやるか！", source: "野獣先輩", category: "名言", aliases: ["じゃあ俺が勃たしてやるか"] },
                { phrase: "じゃあまず、年齢を教えてくれるかな？", category: "名言", aliases: ["じゃあまず年齢を教えてくれるかな"] },
                { phrase: "じゃけん夜行きましょうね～", source: "野獣先輩", category: "名言", aliases: ["じゃけん夜行きましょうね", "じゃけん夜行きましょうね〜", "じゃけん夜行きましょうね~"] },
                { phrase: "ジャッ！キー！チェン！ジャッ！キー！チェン！", category: "名言", aliases: ["ジャッキーチェンジャッキーチェン"] },
                { phrase: "しゃぶってよ、怒ってんの？", source: "淫夢二章", tag: "棒読み", category: "名言", aliases: ["しゃぶってよ怒ってんの"] },
                { phrase: "しゃぶれよ", category: "名言" },
                { phrase: "14万⁉", category: "名言", aliases: ["14万", "14万!?", "14万?!"] },
                { phrase: "14万3000円", category: "名言" },
                { phrase: "シュバルゴ！", category: "名言", aliases: ["シュバルゴ"] },
                { phrase: "小学生並みの感想", category: "名言" },
                { phrase: "小生やだ！", category: "名言", aliases: ["小生やだ"] },
                { phrase: "ジラーチっす", category: "名言" },
                { phrase: "知ｗらｗなｗいｗよｗ", category: "名言" },
                { phrase: "知らねーよ、そんなの", source: "KBTITの怪文書", category: "名言", aliases: ["知らねーよそんなの"] },
                { phrase: "すいませへぇぇ～ん！", category: "名言", aliases: ["すいませへぇぇん", "すいませへぇぇ〜ん！", "すいませへぇぇ~ん！"] },
                { phrase: "すいません許してください！何でもしますから！", category: "名言", aliases: ["すいません許してください何でもしますから"] },
                { phrase: "すき", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "ｽｯﾁｮﾑｽｯﾁｮﾑ…", category: "名言", aliases: ["ｽｯﾁｮﾑｽｯﾁｮﾑ"] },
                { phrase: "ズルルゥンもだよ", category: "名言" },
                { phrase: "世界一やお前！", source: "淫夢厨", category: "淫夢厨語", aliases: ["世界一やお前"] },
                { phrase: "セルシオばっかじゃねーかよお前ん家！", category: "名言", aliases: ["セルシオばっかじゃねーかよお前ん家"] },
                { phrase: "先生がビンビンでいらっしゃるよ、咥えて差し上げろ", category: "名言", aliases: ["先生がビンビンでいらっしゃるよ咥えて差し上げろ"] },
                { phrase: "先生やめちくり～", tag: "挑発", category: "感情表現", aliases: ["先生やめちくり", "先生やめちくり〜", "先生やめちくり~"] },
                { phrase: "センセンシャル！", category: "名言", aliases: ["センセンシャル"] },
                { phrase: "総理大臣の誕生か？", source: "KBTIT", category: "名言", aliases: ["総理大臣の誕生か"] },
                { phrase: "そして天は鳴き、大地は震えるだろうね", source: "野獣先輩", category: "名言", aliases: ["そして天は鳴き大地は震えるだろうね"] },
                { phrase: "そのための右手、あとそのための拳？", category: "名言", aliases: ["そのための右手あとそのための拳"] },
                { phrase: "それ一番言われてるから", category: "名言" },
                { phrase: "それは君の錯覚だよぉ", category: "名言" },
                { phrase: "そんないけない子は先生がお仕置きしちゃる！", category: "名言", aliases: ["そんないけない子は先生がお仕置きしちゃる"] },
                { phrase: "そんなことしたらパパに怒られちゃうだろ！", category: "名言", aliases: ["そんなことしたらパパに怒られちゃうだろ"] },
                { phrase: "そんなことしちゃあダメだろ！", category: "名言", aliases: ["そんなことしちゃあダメだろ"] },
                { phrase: "そんなんじゃ甘いよ", source: "淫夢二章", tag: "棒読み", category: "名言" },

                // ---------- た行 ----------
                { phrase: "TARGET…CAPTURED…BODY SENSOR…", category: "名言", aliases: ["TARGETCAPTUREDBODYSENSOR"] },
                { phrase: "ターミナルさん⁉", category: "名言", aliases: ["ターミナルさん", "ターミナルさん!?", "ターミナルさん?!"] },
                { phrase: "大会近いからね、しょうがないね", source: "野獣先輩", category: "名言", aliases: ["大会近いからねしょうがないね"] },
                { phrase: "大丈夫大丈夫、ヘーキヘーキ", category: "名言", aliases: ["大丈夫大丈夫ヘーキヘーキ"] },
                { phrase: "大丈夫だって安心しろよ～。ヘーキヘーキ、ヘーキだから。", category: "名言", aliases: ["大丈夫だって安心しろよヘーキヘーキヘーキだから", "大丈夫だって安心しろよ〜。ヘーキヘーキ、ヘーキだから。", "大丈夫だって安心しろよ~。ヘーキヘーキ、ヘーキだから。"] },
                { phrase: "ダイナモ感覚！ダイナモ感覚！YO！YO！YO！YEAH！", category: "名言", aliases: ["ダイナモ感覚ダイナモ感覚YOYOYOYEAH"] },
                { phrase: "だいぶ溜まってんじゃんアゼルバイジャン", source: "野獣先輩", category: "名言" },
                { phrase: "だからこんなんじゃ商品になんねぇんだよ", source: "淫夢二章", tag: "棒読み", category: "名言" },
                { phrase: "たくや？今店にお客さんが来て指名が入っています。すぐ来れますか？", source: "KBTITの怪文書", category: "名言", aliases: ["たくや今店にお客さんが来て指名が入っていますすぐ来れますか"] },
                { phrase: "拓也さんのプリケツエロイ！オトコのケツがこんなに締まりがいいなんて、ショック！", source: "KBTITの怪文書", category: "名言", aliases: ["拓也さんのプリケツエロイオトコのケツがこんなに締まりがいいなんてショック"] },
                { phrase: "拓也は戦車にひかれても死なないんだよな", source: "KBTITの怪文書", category: "名言" },
                { phrase: "拓也、また胸でかくなったな！", source: "KBTITの怪文書", category: "名言", aliases: ["拓也また胸でかくなったな"] },
                { phrase: "多少はね？", source: "野獣先輩", category: "名言", aliases: ["多少はね"] },
                { phrase: "たった一度の過ちであり二度と同じ間違いはしません", category: "名言" },
                { phrase: "たまげたなあ", category: "名言" },
                { phrase: "誰？", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "誰だよ、お前の彼かぁ？", category: "名言", aliases: ["誰だよお前の彼かぁ"] },
                { phrase: "誰のクルルァにぶつけたと思ってんだこの野郎", category: "名言" },
                { phrase: "男性器確認できず", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "珍料理、大発見！", category: "名言", aliases: ["珍料理大発見"] },
                { phrase: "違うだろ？", category: "名言", aliases: ["違うだろ"] },
                { phrase: "違うだろ！いいかげんにしろ！", category: "名言", aliases: ["違うだろいいかげんにしろ"] },
                { phrase: "ちかえし", category: "名言" },
                { phrase: "力抜けよ", category: "名言" },
                { phrase: "乳首感じるんでしたよね？", category: "名言", aliases: ["乳首感じるんでしたよね"] },
                { phrase: "乳首も立ってるぞ、と言いつつ", category: "名言", aliases: ["乳首も立ってるぞと言いつつ"] },
                { phrase: "ちゃんちゃちゃちゃんちゃん！Foo！", category: "名言", aliases: ["ちゃんちゃちゃちゃんちゃんFoo"] },
                { phrase: "ちゃんと二本咥え入れろ～", category: "名言", aliases: ["ちゃんと二本咥え入れろ", "ちゃんと二本咥え入れろ〜", "ちゃんと二本咥え入れろ~"] },
                { phrase: "調子こいてんじゃねえぞこの野郎", source: "淫夢二章", tag: "棒読み", category: "名言" },
                { phrase: "ちょっと待って！何これ？", category: "名言", aliases: ["ちょっと待って何これ"] },
                { phrase: "ちんぽであります！", category: "名言", aliases: ["ちんぽであります"] },
                { phrase: "つっかえ！", category: "名言", aliases: ["つっかえ"] },
                { phrase: "続きいくよぉ〜", category: "名言", aliases: ["続きいくよぉ", "続きいくよぉ～", "続きいくよぉ~"] },
                { phrase: "つべこべ言わずに来いホイ", source: "KBTIT", category: "名言" },
                { phrase: "でしかね", category: "名言" },
                { phrase: "デデドン！", tag: "絶望", category: "感情表現", aliases: ["デデドン"] },
                { phrase: "で、出ますよ…", source: "野獣先輩", category: "名言", aliases: ["で出ますよ"] },
                { phrase: "天の喝采～人として～", category: "名言", aliases: ["天の喝采人として", "天の喝采〜人として〜", "天の喝采~人として~"] },
                { phrase: "当時は若くお金が必要でした", category: "名言" },
                { phrase: "どうすっかな～俺もな～", category: "名言", aliases: ["どうすっかな俺もな", "どうすっかな〜俺もな〜", "どうすっかな~俺もな~"] },
                { phrase: "動物裁判だ…！", category: "名言", aliases: ["動物裁判だ"] },
                { phrase: "とか何とかわけわかんねーこと叫びながらコイツ目がイっちゃてる", source: "KBTIT", category: "名言" },
                { phrase: "TKGW様逃げてはダメですよ？", category: "名言", aliases: ["TKGW様逃げてはダメですよ"] },
                { phrase: "ドジョウと俺のさ、子供ができたらどうする？", source: "KBTIT", category: "名言", aliases: ["ドジョウと俺のさ子供ができたらどうする"] },
                { phrase: "とりあえず土下座しろこの野郎", category: "名言" },

                // ---------- な行 ----------
                { phrase: "ないです", source: "野獣先輩", category: "名言" },
                { phrase: "ナオキです", category: "名言" },
                { phrase: "情けない格好、恥ずかしくないの？", source: "淫夢二章", tag: "棒読み", category: "名言", aliases: ["情けない格好恥ずかしくないの"] },
                { phrase: "なぜ男なんだ", category: "名言" },
                { phrase: "ななじすき", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "なに⁉", category: "名言", aliases: ["なに!?", "なに?!"] },
                { phrase: "何がしゃぶれだぁ、お前がしゃぶれよ", source: "淫夢二章", tag: "棒読み", category: "名言", aliases: ["何がしゃぶれだぁお前がしゃぶれよ"] },
                { phrase: "なにが日本一やお前", category: "名言" },
                { phrase: "何これ？", category: "名言", aliases: ["何これ"] },
                { phrase: "何とぼけてんだよ、ココアライオン", category: "名言", aliases: ["何とぼけてんだよココアライオン"] },
                { phrase: "なんか芸術的", category: "名言" },
                { phrase: "なんか足んねぇよなぁ？", category: "名言", aliases: ["なんか足んねぇよなぁ"] },
                { phrase: "なんだお前根性無しだな", source: "淫夢二章", tag: "棒読み", category: "名言" },
                { phrase: "なんだよ…お前のケツ、ガバガバじゃねえかよ", category: "名言", aliases: ["なんだよお前のケツガバガバじゃねえかよ"] },
                { phrase: "なんでホモが湧いてるんですかね…", source: "淫夢厨", category: "淫夢厨語", aliases: ["なんでホモが湧いてるんですかね"] },
                { phrase: "なんとか言えよ変態！", category: "名言", aliases: ["なんとか言えよ変態"] },
                { phrase: "何度もリピートして見てくれ", category: "名言" },
                { phrase: "なんやねんその態度", category: "名言" },
                { phrase: "二回も男汁を出した", category: "名言" },
                { phrase: "24歳、学生です", source: "野獣先輩", category: "名言", aliases: ["24歳学生です"] },
                { phrase: "24でぇ～す", category: "名言", aliases: ["24でぇす", "24でぇ〜す", "24でぇ~す"] },
                { phrase: "にゃ〜", category: "名言", aliases: ["にゃ～", "にゃ~"] },
                { phrase: "人間の屑がこの野郎…", category: "名言", aliases: ["人間の屑がこの野郎"] },
                { phrase: "ヌッ！", source: "野獣先輩", category: "擬音" },
                { phrase: "ぬわあああああん疲れたもおおおおおん", source: "野獣先輩", category: "名言" },
                { phrase: "伸びた？伸びない？", source: "野獣先輩", category: "名言", aliases: ["伸びた伸びない"] },

                // ---------- は行 ----------
                { phrase: "バァン！", tag: "大破", category: "名言", aliases: ["バァン"] },
                { phrase: "入って、どうぞ！", source: "野獣先輩", category: "名言", aliases: ["入ってどうぞ"] },
                { phrase: "ﾊﾟｲﾊﾟｲﾊﾟｰｲﾊﾟﾊﾟｲﾆﾞﾁｰｯﾁｯﾁｯﾁｯﾁｯﾁｯｽﾞｵｫ", category: "名言" },
                { phrase: "はい、ヨロシクぅ！", category: "名言", aliases: ["はいヨロシクぅ"] },
                { phrase: "はえ～", category: "名言", aliases: ["はえ〜", "はえ~"] },
                { phrase: "白菜かけますね", source: "野獣先輩", category: "名言" },
                { phrase: "恥ずかしくないの？", source: "淫夢二章", tag: "棒読み", category: "名言", aliases: ["恥ずかしくないの"] },
                { phrase: "恥ずかしくないのかよ？", category: "名言", aliases: ["恥ずかしくないのかよ"] },
                { phrase: "外してんじゃねぇよバァカ！", category: "名言", aliases: ["外してんじゃねぇよバァカ"] },
                { phrase: "ハチゴー", category: "名言" },
                { phrase: "はっきり言って俺後悔してる…だけどもう…今更手遅れだから", category: "名言", aliases: ["はっきり言って俺後悔してるだけどもう今更手遅れだから"] },
                { phrase: "はっきりわかんだね", source: "野獣先輩", category: "名言" },
                { phrase: "ﾊﾟｯｿ...", category: "擬音", aliases: ["ﾊﾟｯｿ"] },
                { phrase: "バッチェ冷えてますよ", source: "野獣先輩", category: "名言" },
                { phrase: "早くしろよ", category: "名言" },
                { phrase: "流行らせコラ！", category: "名言", aliases: ["流行らせコラ"] },
                { phrase: "腹減ったなぁ", category: "名言" },
                { phrase: "卍解～", source: "KBTIT", category: "名言", aliases: ["卍解〜", "卍解~"] },
                { phrase: "バン！ババン！バン！", category: "名言", aliases: ["バンババンバン"] },
                { phrase: "He didn't…he begin…", source: "野獣先輩", category: "名言", aliases: ["Hedidn'thebegin"] },
                { phrase: "ビール！ビール！", source: "野獣先輩", category: "名言", aliases: ["ビールビール"] },
                { phrase: "冷えてるか～？", category: "名言", aliases: ["冷えてるか", "冷えてるか〜？", "冷えてるか~？"] },
                { phrase: "ひで", source: "淫夢厨", tag: "用語", category: "淫夢厨語" },
                { phrase: "110弱でしょうねぇ", category: "名言" },
                { phrase: "微粒子レベルで存在している…？", source: "淫夢厨", category: "淫夢厨語", aliases: ["微粒子レベルで存在している"] },
                { phrase: "微レ存", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "Foo↑気持ちぃ～", source: "野獣先輩", category: "名言", aliases: ["Foo↑気持ちぃ", "Foo↑気持ちぃ〜", "Foo↑気持ちぃ~"] },
                { phrase: "ふたいたい", source: "野獣先輩", category: "名言" },
                { phrase: "二人は幸せなキスをして終了", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "ぶち込んでやるぜ！", category: "名言", aliases: ["ぶち込んでやるぜ"] },
                { phrase: "普通に赤ちゃんみたいでかわいいと思う", source: "淫夢厨", category: "淫夢厨語" },
                { phrase: "ブッチッパ！", source: "野獣先輩", category: "名言", aliases: ["ブッチッパ"] },
                { phrase: "太いシーチキンが欲しい…", category: "名言", aliases: ["太いシーチキンが欲しい"] },
                { phrase: "太いチンポがおまんこに入っちゃう！", category: "名言", aliases: ["太いチンポがおまんこに入っちゃう"] },
                { phrase: "太すぎるッピ！", category: "名言", aliases: ["太すぎるッピ"] },
                { phrase: "ぷももえんぐえげぎおんもえちょっちょっちゃっさっ！", category: "名言", aliases: ["ぷももえんぐえげぎおんもえちょっちょっちゃっさっ"] },
                { phrase: "フル焼きそば！", category: "名言", aliases: ["フル焼きそば"] },
                { phrase: "ヘーキヘーキ", category: "名言" },
                { phrase: "へぇっ⁉ホ、ホナニーですかぁ⁉", category: "名言", aliases: ["へぇっホホナニーですかぁ", "へぇっ!?ホ、ホナニーですかぁ!?", "へぇっ?!ホ、ホナニーですかぁ?!"] },
                { phrase: "ペニス、男根、マラ、チンポ、おちんちん", category: "名言", aliases: ["ペニス男根マラチンポおちんちん"] },
                { phrase: "ぼくひで", category: "名言" },
                { phrase: "ﾎﾟｯﾁｬﾏ...", category: "擬音", aliases: ["ﾎﾟｯﾁｬﾏ"] },
                { phrase: "ホモの魔の手からは絶対に逃れられない！", source: "淫夢厨", category: "淫夢厨語", aliases: ["ホモの魔の手からは絶対に逃れられない"] },
                { phrase: "ホモビデオ出よう、主演は俺だから", category: "名言", aliases: ["ホモビデオ出よう主演は俺だから"] },
                { phrase: "本人が見たら怒りそう", source: "淫夢厨", category: "淫夢厨語" },

                // ---------- ま行 ----------
                { phrase: "枕に生を、背もたれに死を", category: "名言", aliases: ["枕に生を背もたれに死を"] },
                { phrase: "まずいですよ！", category: "名言", aliases: ["まずいですよ"] },
                { phrase: "まずうちさぁ、屋上…あんだけど、焼いてかない？", source: "野獣先輩", category: "名言", aliases: ["まずうちさぁ屋上あんだけど焼いてかない"] },
                { phrase: "また君か壊れるなぁ", category: "名言" },
                { phrase: "ま、多少はね？", source: "野獣先輩", category: "名言", aliases: ["ま多少はね"] },
                { phrase: "マ゜ッ！", category: "擬音", aliases: ["マ゜ッ"] },
                { phrase: "窓際行って…シコれ", source: "淫夢二章", tag: "棒読み", category: "名言", aliases: ["窓際行ってシコれ"] },
                { phrase: "MURさん夜中腹減んないすか？", source: "野獣先輩", category: "名言", aliases: ["MURさん夜中腹減んないすか"] },
                { phrase: "見える見える…太いぜ", category: "名言", aliases: ["見える見える太いぜ"] },
                { phrase: "見とけよ見とけよ～", source: "野獣先輩", category: "名言", aliases: ["見とけよ見とけよ", "見とけよ見とけよ〜", "見とけよ見とけよ~"] },
                { phrase: "ミニカーやるからついてこい", category: "名言" },
                { phrase: "見ろよ見ろよ", category: "名言" },
                { phrase: "ムーミンやろお前！", category: "名言", aliases: ["ムーミンやろお前"] },
                { phrase: "ムラムラジェラシーを感じる", source: "KBTIT", category: "名言" },
                { phrase: "免許証返してください", category: "名言" },
                { phrase: "More precious 気持ちよくなっちゃう。もういいよ、ヤバイヤバイ。", source: "野獣先輩", category: "名言", aliases: ["Moreprecious気持ちよくなっちゃうもういいよヤバイヤバイ"] },
                { phrase: "もう始まってる！", category: "名言", aliases: ["もう始まってる"] },
                { phrase: "もう待ちきれないよ！早く出してくれ！", category: "名言", aliases: ["もう待ちきれないよ早く出してくれ"] },
                { phrase: "もう許せるぞオイ！", source: "KBTIT", category: "名言", aliases: ["もう許せるぞオイ"] },
                { phrase: "元はホモビ", source: "淫夢厨", category: "淫夢厨語" },

                // ---------- や行 ----------
                { phrase: "やだ！小生やだ！", category: "名言", aliases: ["やだ小生やだ"] },
                { phrase: "やっちゃうよ？やっちゃうよ！？", category: "名言", aliases: ["やっちゃうよやっちゃうよ"] },
                { phrase: "やっぱジャイアンツ！", category: "名言", aliases: ["やっぱジャイアンツ"] },
                { phrase: "やべぇよ…やべぇよ…", category: "名言", aliases: ["やべぇよやべぇよ"] },
                { phrase: "やめたくなりますよなんか部っ活ぅ～", source: "野獣先輩", category: "名言", aliases: ["やめたくなりますよなんか部っ活ぅ", "やめたくなりますよなんか部っ活ぅ〜", "やめたくなりますよなんか部っ活ぅ~"] },
                { phrase: "やりますねぇ！", source: "野獣先輩", tag: "大声", category: "名言", aliases: ["やりますねぇ"] },
                { phrase: "やれば返していただけるんですか？", category: "名言", aliases: ["やれば返していただけるんですか"] },
                { phrase: "やんほぬ", source: "野獣先輩", category: "名言" },
                { phrase: "裕子と菊代", category: "名言" },
                { phrase: "You have a 夜中腹減んないすか？", source: "野獣先輩", category: "名言", aliases: ["Youhavea夜中腹減んないすか"] },
                { phrase: "よしお前らクルルァについてこい", category: "名言" },
                { phrase: "よし、じゃあぶち込んでやるぜ！", category: "名言", aliases: ["よしじゃあぶち込んでやるぜ"] },
                { phrase: "ヨツンヴァイン", category: "名言" },
                { phrase: "喜ぶんやど！", category: "名言", aliases: ["喜ぶんやど"] },

                // ---------- ら行 ----------
                { phrase: "ライダー助けて！", category: "名言", aliases: ["ライダー助けて"] },

                // ---------- わ行 ----------
                { phrase: "わかったわかったダイエー！", category: "名言", aliases: ["わかったわかったダイエー"] },
                { phrase: "わかったわかったわかったよもう！", category: "名言", aliases: ["わかったわかったわかったよもう"] },
                { phrase: "ンアッー！", source: "野獣先輩", category: "擬音", aliases: ["ンアッー"] },
                { phrase: "ん？今何でもするって言ったよね？", category: "名言", aliases: ["ん今何でもするって言ったよね"] },
                { phrase: "ンギモッヂイイ！", category: "名言", aliases: ["ンギモッヂイイ"] },
                { phrase: "んにゃぴ", source: "野獣先輩", category: "名言" },
                { phrase: "んまぁそう…よくわかんなかったです", source: "野獣先輩", category: "名言", aliases: ["んまぁそうよくわかんなかったです"] },
                { phrase: "ンンッ…マ゜ッ！ア゛ッ！↑", category: "名言", aliases: ["ンンッマ゜ッア゛ッ↑"] },

                // ---------- 英数字記号 ----------
                { phrase: "F.C.O.H.", category: "名言", aliases: ["FCOH"] },
                { phrase: "＾～↑＾～↓＾～↑", category: "名言", aliases: ["＾↑＾↓＾↑", "＾〜↑＾〜↓＾〜↑", "＾~↑＾~↓＾~↑"] },

                // ---------- 逆引き表より（五十音順に無かったもの） ----------
                { phrase: "布団の上で枕を…⁉抱えて…？", tag: "嫉妬", category: "感情表現", aliases: ["布団の上で枕を抱えて", "布団の上で枕を…!?抱えて…？", "布団の上で枕を…?!抱えて…？"] },
            ],

            // ========== パターン検出 ==========
            patterns: [
                { regex: /(\S+)以上、(\S+)以下？/, original: "20人以上、30人以下？", category: "パターン" },
                { regex: /(\S+)かな？/, original: "○○かな？", category: "パターン" },
                { regex: /(\S+)か何か？/, original: "野球か何か？", category: "パターン" },
                { regex: /(\S+)がね[・.…]+/, original: "顔がね・・・", category: "パターン" },
                { regex: /(\S+)したい…\S+したくない？/, original: "喉渇いた…喉渇かない？", category: "パターン" },
                { regex: /(\S+)して[♡♥]/, original: "○○して♡", category: "パターン" },
                { regex: /(\S+)しませんか？\S+しましょうよ/, original: "行きませんか？行きましょうよ", category: "パターン" },
                { regex: /(\S+)しよう（提案）/, original: "○○しよう（提案）", category: "パターン" },
                { regex: /(\S+)する（\S+とは言っていない）/, original: "おう、考えてやるよ（返すとは言っていない）", category: "パターン" },
                { regex: /(\S+)するのか…（困惑）/, original: "自分から入っていくのか…（困惑）", category: "パターン" },
                { regex: /(\S+)すればいいじゃん/, original: "え、山下公園行けばいいじゃん", category: "パターン" },
                { regex: /(\S+)ゾ[～~]?/, original: "○○ゾ〜", category: "パターン" },
                { regex: /(\S+)でしかね？/, original: "ステでもやっているのでしかね？あの乳首は", category: "パターン" },
                { regex: /(\S+)でしょ。/, original: "ケツでしょ。", category: "パターン" },
                { regex: /(\S+)所さん/, original: "田所さん⁉", category: "パターン" },
                { regex: /(\S+)なのだが[….]+/, original: "俊さん４０歳くらいに見えるのだが･…", category: "パターン" },
                { regex: /(\S+)なんて、ショック！/, original: "オトコのケツがこんなに締まりがいいなんて、ショック！", category: "パターン" },
                { regex: /(\S+)なんですがそれは…/, original: "それは大丈夫なんですかね？", category: "パターン" },
                { regex: /(\S+)にはまったく似ていません！/, original: "南佳也にはまったく似ていません！", category: "パターン" },
                { regex: /(\S+)の(\S+)エロイ！/, original: "拓也さんのプリケツエロイ！", category: "パターン" },
                { regex: /(\S+)はNG/, original: "申し訳ないが昼はNG", category: "パターン" },
                { regex: /(\S+)は関係ないだろ！いい加減にしろ！/, original: "関係ないだろ！いい加減にしろ！", category: "パターン" },
                { regex: /(\S+)はキャンセルだ/, original: "朝日テレビはキャンセルだ", category: "パターン" },
                { regex: /(\S+)は(\S+)なのでもっとやれ/, original: "もっとやれ", category: "パターン" },
                { regex: /(\S+)は(\S+)なのでやめろ/, original: "○○は△△なのでやめろ", category: "パターン" },
                { regex: /(\S+)よね。/, original: "AV男優の南佳也にそっくりよね。", category: "パターン" },
                { regex: /あーねん(まつ|し)/, original: "あーつまんね", category: "改変" },
                { regex: /成し遂げたぜ。/, original: "やったぜ。", category: "改変" },

                // ---- 語録Wiki追加分 ----
                { regex: /(\S{1,20})である可能性が微粒子レベルで存在している[…\.]*[？?]?/, original: "○○である可能性が微粒子レベルで存在している…？", category: "パターン" },
                { regex: /(\S{1,15})はホモ/, original: "○○はホモ", category: "パターン" },
                { regex: /([^\s（）()、。！？]{1,4})並感/, original: "小並感（○○並感）", category: "パターン" },
            ]
        };

        this.options = {
            caseSensitive: false,
            partialMatch: true,
            includeVariations: true,
            normalizeSmallVowels: true,
            normalizePunctuation: true,
            normalizeEllipsis: true
        };

        this.normalizationMap = {
            'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お',
            'ァ': 'ア', 'ィ': 'イ', 'ゥ': 'ウ', 'ェ': 'エ', 'ォ': 'オ',
            'っ': 'つ', 'ッ': 'ツ',
            'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ',
            'ャ': 'ヤ', 'ュ': 'ユ', 'ョ': 'ヨ',
            '！': '!', '？': '?', '　': ' ',
            '…': '...', '‥': '..', '・・・': '...'
        };
    }

    normalize(text) {
        let normalized = text;
        if (this.options.normalizeSmallVowels) {
            for (const [from, to] of Object.entries(this.normalizationMap)) {
                normalized = normalized.split(from).join(to);
            }
        }
        if (this.options.normalizePunctuation) {
            normalized = normalized.replace(/[！]/g, '!').replace(/[？]/g, '?');
        }
        return normalized;
    }

    detect(text) {
        const results = [];
        const normalizedText = this.options.caseSensitive ? text : text.toLowerCase();
        const normalizedTextForCheck = this.normalize(normalizedText);

        this.database.direct.forEach(entry => {
            let matched = false;
            let matchText = entry.phrase;

            if (entry.regex) {
                const regex = new RegExp(entry.regex.source, 'gi');
                const matches = text.match(regex);
                if (matches) {
                    matched = true;
                    matchText = matches[0];
                }
            } else {
                const normalizedPhrase = this.normalize(
                    this.options.caseSensitive ? entry.phrase : entry.phrase.toLowerCase()
                );

                if (this.options.partialMatch) {
                    if (normalizedTextForCheck.includes(normalizedPhrase)) {
                        matched = true;
                        const idx = normalizedTextForCheck.indexOf(normalizedPhrase);
                        matchText = text.substring(idx, idx + entry.phrase.length);
                    }
                } else {
                    if (normalizedTextForCheck === normalizedPhrase) {
                        matched = true;
                    }
                }

                if (!matched && entry.aliases && this.options.includeVariations) {
                    for (const alias of entry.aliases) {
                        const normalizedAlias = this.normalize(
                            this.options.caseSensitive ? alias : alias.toLowerCase()
                        );
                        if (normalizedTextForCheck.includes(normalizedAlias)) {
                            matched = true;
                            const idx = normalizedTextForCheck.indexOf(normalizedAlias);
                            matchText = text.substring(idx, idx + alias.length);
                            break;
                        }
                    }
                }
            }

            if (matched) {
                results.push({
                    type: 'direct',
                    matched: matchText,
                    canonical: entry.phrase,
                    position: text.indexOf(matchText),
                    ...entry
                });
            }
        });

        if (this.options.includeVariations) {
            this.database.patterns.forEach(pattern => {
                const regex = new RegExp(pattern.regex.source, 'gi');
                const matches = text.matchAll(regex);
                for (const match of matches) {
                    results.push({
                        type: 'pattern',
                        matched: match[0],
                        original: pattern.original,
                        position: match.index,
                        ...pattern
                    });
                }
            });
        }

        return this.deduplicate(results);
    }

    deduplicate(results) {
        const seen = new Set();
        return results.filter(result => {
            const key = `${result.matched}-${result.position}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).sort((a, b) => a.position - b.position);
    }

    format(results) {
        if (results.length === 0) {
            return "淫夢語録は検出されませんでした。";
        }

        const categories = this.categorize(results);
        let output = `【検出結果: ${results.length}件】\n\n`;

        for (const [cat, items] of Object.entries(categories)) {
            output += `■ ${cat} (${items.length}件)\n`;
            items.forEach(item => {
                output += `  ・「${item.matched}」`;
                if (item.canonical && item.matched !== item.canonical) {
                    output += ` →「${item.canonical}」`;
                }
                if (item.source) output += ` [${item.source}]`;
                if (item.tag) output += ` (${item.tag})`;
                output += '\n';
            });
            output += '\n';
        }

        return output;
    }

    categorize(results) {
        const categories = {};
        results.forEach(result => {
            const cat = result.category || '未分類';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(result);
        });
        return categories;
    }

    categorizeByTag(results) {
        const tags = {};
        results.forEach(result => {
            if (result.tag) {
                if (!tags[result.tag]) tags[result.tag] = [];
                tags[result.tag].push(result);
            }
        });
        return tags;
    }

    categorizeBySource(results) {
        const sources = {};
        results.forEach(result => {
            const src = result.source || '不明';
            if (!sources[src]) sources[src] = [];
            sources[src].push(result);
        });
        return sources;
    }

    addPhrase(phrase, metadata = {}) {
        this.database.direct.push({ phrase, ...metadata });
    }

    addPattern(regex, metadata = {}) {
        this.database.patterns.push({ regex, ...metadata });
    }

    setOptions(options) {
        this.options = { ...this.options, ...options };
    }
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InmuDetector;
}