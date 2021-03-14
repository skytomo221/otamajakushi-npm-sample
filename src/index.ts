import * as fs from "fs";
import OTMJSON from "otamajakushi";
import { Otm } from "otamajakushi/dist/Otm";

const json = fs.readFileSync("./src/sample.json", "utf8");

{
  /* 通常は OTMJSON.parse を用いることで解析することができます。` */
  const dictionary = OTMJSON.parse(json);

  /* 辞書に収録された単語の数を調べる方法 */
  console.log(`この辞書の単語数は ${dictionary.words.length} です。`);

  /* 単語のスペルと和訳を表示する */
  dictionary.words.forEach((word) => {
    /* 和訳の配列の最初の要素を取り出す */
    const translation = word.translations[0];
    console.log(`${word.entry.form} … ${translation.forms}`);
  });
}

{
  /* 例えば、この sample.json には humanLanguage が含まれています。 */
  /* これを取得してみましょう。 */

  /* まずこのように型を定義します。 */
  type CustomOtm = {
    humanLanguage: boolean;
  };

  /* 次に Type predicates の機能を使って関数を定義します。 */
  /* Type predicates については以下の公式サイトから知ることができます。 */
  /* https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates */
  function hasHumanLanguage(
    otm: Otm | CustomOtm | Record<string, unknown>
  ): otm is CustomOtm {
    return (otm as CustomOtm).humanLanguage !== undefined;
  }

  /* `OTMJSON.run を用いることでオプションの項目について扱うことができます。` */
  const result = OTMJSON.run(json);
  /* 解析がうまくいったかを確認します */
  if (result.ok) {
    /* 解析がうまくいった場合は、 result で辞書を取得することができます。 */
    const dictionary = result.result;
    /* 最後にこの辞書が humanLanguage という項目を持っているか確認します */
    if (hasHumanLanguage(dictionary)) {
      /* これで、 humanLanguage を取得することができました。 */
      /* 我々の勝利です！ console.log で表示してみましょう。 */
      console.log(
        `この辞書は Human Language についての辞書であるか… ${dictionary.humanLanguage}`
      );
    }
  }
}
