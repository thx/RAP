import com.taobao.rigel.rap.common.StringUtils;



public class Tester {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String val = "<script src=\"http://rap.alibaba-inc.com/rap.plugin.js?projectId=159&mode=0\"></script>";
		
		System.out.println(StringUtils.escapeInH(val));
			
	}

}
