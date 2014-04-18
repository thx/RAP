import com.taobao.rigel.rap.common.StringUtils;

public class Tester {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		/**
		int num = 1;
		Pattern p = Pattern.compile(Patterns.MOCK_TEMPLATE_PATTERN);
		Matcher matcher = p.matcher("${page=1008}");
		while (matcher.find()) {
			System.out.println("找到的第" + num++ + "组");
			int c = matcher.groupCount();
			while (c-- > 0 ? true : false) {
				System.out.println("[" + c + "] " + matcher.group(c));
			}

		}
		*/
		
		System.out.println(StringUtils.chineseToUnicode("123测试一下aaa"));

	}

}
