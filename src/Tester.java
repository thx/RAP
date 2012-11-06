import nl.flotsam.xeger.Xeger;


public class Tester {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String regex = "[0-9]+";
		Xeger generator = new Xeger(regex);
		String result = generator.generate();
		assert result.matches(regex);
		System.out.println(result);
	}

}
