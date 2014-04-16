import com.taobao.rigel.rap.common.StringUtils;



public class Tester {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String val = "<map class=\"abc\"></map>";
		
		System.out.println(StringUtils.escapeInJ(val));
			
	}

}
