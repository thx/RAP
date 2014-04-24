import java.util.Date;

import com.taobao.rigel.rap.common.DateUtils;

public class Tester {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		Date date = new Date();
		Date date2 = new Date();
		System.out.println(DateUtils.compWorkAndCurrByDate(date, date2));
		date2.setDate(3);

		System.out.println(DateUtils.compWorkAndCurrByDate(date, date2));
	}

}
